import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// 🚨 IMPORTANT: Change this to process.env.GOOGLE_API_KEY (without NEXT_PUBLIC_)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

// Helper function to format doctor notes
function formatDoctorNotes(notes: any[]): string {
  if (!notes || notes.length === 0) return "არ არის ჩანაწერები";

  return notes
    .map(
      (note: any, i: number) =>
        `${i + 1}. ${new Date(note.date).toLocaleDateString("ka-GE")}: ${
          note.note
        } (ექიმი: ${note.doctorName})`
    )
    .join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientData, healthCard, currentSymptoms } = body;

    // Validate required fields
    if (!patientData || !currentSymptoms?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Patient data and current symptoms are required",
        },
        { status: 400 }
      );
    }

    // Build comprehensive medical history
    const medicalHistory = [];
    if (healthCard?.chiefComplaints) {
      medicalHistory.push(`ძირითადი საჩივრები: ${healthCard.chiefComplaints}`);
    }
    if (healthCard?.finalClinicalDiagnosisMain) {
      medicalHistory.push(
        `ბოლო დიაგნოზი: ${healthCard.finalClinicalDiagnosisMain}`
      );
    }

    // Extract medications from doctor notes if available
    const doctorNotesText = formatDoctorNotes(healthCard?.doctorNotes || []);

    const prompt = `You are a medical assistant helping doctors in Georgia. Answer in Georgian.

პაციენტის სრული ინფორმაცია:
- სახელი: ${patientData.fullName}
- ასაკი: ${patientData.age} წელი
- სქესი: ${patientData.sex}
- სიმაღლე: ${patientData.height} სმ
- წონა: ${patientData.weight} კგ
- BMI: ${(patientData.weight / (patientData.height / 100) ** 2).toFixed(1)}
- დაბადების თარიღი: ${new Date(patientData.dateOfBirth).toLocaleDateString(
      "ka-GE"
    )}
- ოჯახური მდგომარეობა: ${patientData.martialStatus}

სამედიცინო ისტორია (ჯანმრთელობის ბარათიდან):
${
  medicalHistory.length > 0 ? medicalHistory.join("\n") : "არ არის წინა ისტორია"
}

ექიმის წინა ჩანაწერები:
${doctorNotesText}

ამჟამინდელი სიმპტომები (რაც აწუხებს ახლა):
${currentSymptoms}

გთხოვთ გააკეთოთ შემდეგი:

1. პაციენტის ჯანმრთელობის მდგომარეობის მოკლე შეჯამება (patientSummary) - გაითვალისწინეთ მისი ასაკი, წონა, ისტორია და ახლანდელი სიმპტომები

2. მიუთითეთ 5 ყველაზე შესაძლო მდგომარეობა (differentialDiagnosis) პაციენტის ისტორიისა და ამჟამინდელი სიმპტომების გათვალისწინებით

3. რეკომენდირებული სამედიცინო ტესტები (suggestedTests)

4. გამაფრთხილებელი ნიშნები რომლებიც საჭიროებს გადაუდებელ ყურადღებას (redFlags)

5. დამატებითი შეკითხვები პაციენტისთვის (clarifyingQuestions)

6. გადაუდებლობის დონე: "low", "moderate", ან "urgent" (urgencyLevel)

ᲛᲜᲘᲨᲕᲜᲔᲚᲝᲕᲐᲜᲘ: 
- ეს არის ექიმის დამხმარე ინსტრუმენტი
- საბოლოო დიაგნოზს აძლევს ექიმი
- გაითვალისწინეთ პაციენტის ასაკი და წინა ისტორია რეკომენდაციებში

უპასუხეთ ᲛᲮᲝᲚᲝᲓ ამ JSON ფორმატში (არანაირი დამატებითი ტექსტი):
{
  "patientSummary": "პაციენტის მდგომარეობის მოკლე შეჯამება",
  "differentialDiagnosis": [
    {
      "condition": "დაავადების სახელი",
      "likelihood": "85%",
      "reasoning": "მოკლე ახსნა რატომ არის ეს შესაძლო"
    }
  ],
  "suggestedTests": ["ტესტი 1", "ტესტი 2"],
  "redFlags": ["გამაფრთხილებელი ნიშანი 1"],
  "clarifyingQuestions": ["შეკითხვა 1"],
  "urgencyLevel": "low"
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("Failed to parse AI response:", responseText);
      return NextResponse.json(
        {
          success: false,
          error: "AI response format error. Please try again.",
        },
        { status: 500 }
      );
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate response structure
    if (!analysis.differentialDiagnosis || !analysis.urgencyLevel) {
      return NextResponse.json(
        {
          success: false,
          error: "Incomplete AI analysis. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
      rawResponse: responseText,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
