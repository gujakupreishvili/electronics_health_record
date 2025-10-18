"use client";
import { useState } from "react";
import { Analysis } from "../types";

export default function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedications] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      setError("Please describe your symptoms");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ai/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptoms.trim(),
          age: age || "Not specified",
          medicalHistory: medicalHistory
            .split(",")
            .map((h) => h.trim())
            .filter((h) => h),
          medications: medications
            .split(",")
            .map((m) => m.trim())
            .filter((m) => m),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError("Failed to analyze symptoms");
        return;
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(
        "Error: " + (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>ხელოვნური ინტელექტის სიმპტომების ანალიზის ასისტენტი</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>ასაკი:</strong>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="შეიყვანეთ ასაკი"
            style={{ marginLeft: "10px", padding: "8px", width: "150px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>სამედიცინო ისტორია (გამოყავით მძიმით):</strong>
          <textarea
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
            placeholder="მაგალითად, ასთმა, დიაბეტი, მაღალი წნევა"
            style={{
              marginLeft: "10px",
              padding: "8px",
              width: "100%",
              minHeight: "60px",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>ამჟამად მიღებული მედიკამენტები (გამოყავით მძიმით):</strong>
          <textarea
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="მაგალითად: ასპირინი, ინსულინი"
            style={{
              marginLeft: "10px",
              padding: "8px",
              width: "100%",
              minHeight: "60px",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>აღწერეთ პაციენტის სიმპტომები:</strong>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="აღწერეთ რა აწუხებს პაციენტს დეტალურად"
            style={{
              marginLeft: "10px",
              padding: "8px",
              width: "100%",
              minHeight: "120px",
              fontFamily: "sans-serif",
            }}
          />
        </label>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "სიმპტომების ანალიზი..." : "სიმპტომების ანალიზი"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}>
          Error: {error}
        </div>
      )}

      {analysis && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #ddd",
            padding: "20px",
          }}
        >
          <h2>ხელოვნური ინტელექტის ანალიზის შედეგები</h2>
          <div style={{ marginBottom: "20px" }}>
            <h3>
              გადაუდებლობის დონე:{" "}
              <span
                style={{
                  color: analysis.urgencyLevel === "urgent" ? "red" : "orange",
                }}
              >
                {analysis.urgencyLevel?.toUpperCase()}
              </span>
            </h3>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>შესაძლო მდგომარეობები:</h3>
            {analysis.differentialDiagnosis?.map((dx, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <strong>
                  {i + 1}. {dx.condition}
                </strong>
                <div style={{ marginTop: "5px", color: "#666" }}>
                  შესაძლებლობა: <strong>{dx.likelihood}</strong>
                </div>
                <div style={{ marginTop: "5px", color: "#666" }}>
                  რატომ: {dx.reasoning}
                </div>
              </div>
            ))}
          </div>

          {analysis.redFlags?.length > 0 && (
            <div
              style={{
                marginBottom: "20px",
                backgroundColor: "#fff3cd",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>🚨 საჭიროებს ყურადღებას:</h3>
              <ul>
                {analysis.redFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <h3>💡 რეკომენდირებული ტესტები:</h3>
            <ul>
              {analysis.suggestedTests?.map((test, i) => (
                <li key={i}>{test}</li>
              ))}
            </ul>
          </div>

          {analysis.clarifyingQuestions?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h3>❓ შეკითხვები პაციენტებისათვის:</h3>
              <ul>
                {analysis.clarifyingQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
