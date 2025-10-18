import {
  AnalysisRequest,
  AnalysisResponse,
  DifferentialDiagnosis,
} from "@/app/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalysisRequest;
    const { symptoms, age, medicalHistory, medications } = body;
    const prompt = `You are a medical assistant helping doctors in Georgia please answer in Georgian.
A patient reports the following:

პაციენტის ინფორმაცია:
- ასაკი: ${age}
- სამედიცინო ისტორია: ${
      medicalHistory.length > 0 ? medicalHistory.join(", ") : "None reported"
    }
- რა მედიკამენტებს იღებს პაციენტი ამჟამად: ${
      medications.length > 0 ? medications.join(", ") : "None"
    }

SYMPTOMS:
${symptoms}

PLEASE ANALYZE AND PROVIDE:
1. Top 5 possible conditions (with likelihood percentage)
2. Why each condition is suggested (brief reasoning)
3. Recommended medical tests
4. Any red flags that need urgent attention
5. Clarifying questions you'd ask the patient

IMPORTANT: This is for doctor support only. The doctor makes the final diagnosis.

Format your response EXACTLY like this JSON:
{
  "differentialDiagnosis": [
    {"condition": "Disease Name", "likelihood": "85%", "reasoning": "Brief reason"}
  ],
  "suggestedTests": ["test 1", "test 2"],
  "redFlags": ["flag 1"],
  "clarifyingQuestions": ["question 1"],
  "urgencyLevel": "low"
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch
      ? (JSON.parse(jsonMatch[0]) as AnalysisResponse)
      : null;

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
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
