import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_KEY!);

function formatDoctorNotes(notes: any): string {
  if (!notes) {
    return "ექიმის ჩანაწერები არ არის ხელმისაწვდომი";
  }

  if (typeof notes === "string") {
    return notes;
  }

  if (typeof notes === "object" && !Array.isArray(notes)) {
    if (notes.date && notes.note) {
      return `${new Date(notes.date).toLocaleDateString("ka-GE")}: ${
        notes.note
      }`;
    }
    return JSON.stringify(notes, null, 2);
  }

  if (Array.isArray(notes)) {
    if (notes.length === 0) {
      return "ექიმის ჩანაწერები ჯერ არ არის დამატებული";
    }
    return notes
      .map(
        (note: any, i: number) =>
          `${i + 1}. ${new Date(note.date).toLocaleDateString("ka-GE")}: ${
            note.note
          }`
      )
      .join("\n");
  }

  return "ექიმის ჩანაწერები არასწორი ფორმატით არის";
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.AI_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GEMINI_API_KEY არ არის კონფიგურირებული",
        },
        { status: 500 }
      );
    }

    const { patientData, healthCard, currentSymptoms } = await req.json();

    if (!patientData || !currentSymptoms) {
      return NextResponse.json(
        {
          success: false,
          error: "პაციენტის მონაცემები ან სიმპტომები არ არის მითითებული",
        },
        { status: 400 }
      );
    }

    console.log("doctorNotes type:", typeof healthCard?.doctorNotes);
    console.log("doctorNotes value:", healthCard?.doctorNotes);

    const formattedNotes = healthCard?.doctorNotes
      ? formatDoctorNotes(healthCard.doctorNotes)
      : "ექიმის ჩანაწერები არ არის ხელმისაწვდომი";

    const prompt = `თქვენ ხართ გამოცდილი ექიმი-დიაგნოსტიკოსი. გაანალიზეთ პაციენტის სიმპტომები და სამედიცინო ისტორია.

პაციენტის ინფორმაცია:
- სახელი: ${patientData.fullName}
- ასაკი: ${patientData.age} წელი
- სქესი: ${patientData.sex}
- წონა: ${patientData.weight} კგ
- სიმაღლე: ${patientData.height} სმ

სამედიცინო ისტორია:
- ძირითადი საჩივრები (ისტორია): ${healthCard?.chiefComplaints || "არ არის"}
- ბოლო დიაგნოზი: ${healthCard?.finalClinicalDiagnosisMain || "არ არის"}
- ექიმის ჩანაწერები:
${formattedNotes}

ამჟამინდელი სიმპტომები:
${currentSymptoms}

გთხოვთ უპასუხოთ ქართულად და მოგვაწოდოთ:

1. შესაძლო დიაგნოზები (სიმძიმის მიხედვით დალაგებული)
2. რეკომენდებული გამოკვლევები
3. რისკის ფაქტორები
4. გადაუდებელი სამედიცინო ნიშნები (თუ არსებობს)

გთხოვთ იყოთ კონკრეტული და პროფესიონალური.`;

    // Try multiple model names in order
    const modelNames = [
      "gemini-2.0-flash-exp",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest",
      "gemini-pro",
    ];

    let analysisText = "";
    let lastError = null;

    for (const modelName of modelNames) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = result.response;
        analysisText = response.text();
        console.log(`✅ Success with model: ${modelName}`);
        break; // Success, exit loop
      } catch (error: any) {
        console.log(`❌ Failed with ${modelName}:`, error.message);
        lastError = error;
        continue; // Try next model
      }
    }

    if (!analysisText) {
      throw lastError || new Error("ყველა მოდელი ვერ მუშაობს");
    }

    return NextResponse.json({
      success: true,
      analysis: {
        text: analysisText,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "უცნობი შეცდომა",
      },
      { status: 500 }
    );
  }
}
