"use client";
import { useState } from "react";
import { db } from "@/lib/db";
import { Analysis } from "../types";
import React from "react";

export default function SymptomAnalyzer() {
  const [personalId, setPersonalId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [patientData, setPatientData] = useState<any>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    isLoading: fetchingPatient,
    error: fetchError,
    data,
  } = db.useQuery({
    patients: {
      $: { where: { personalId } },
      healthCard: {},
    },
  });
  React.useEffect(() => {
    if (data?.patients?.[0]) {
      setPatientData({
        patient: data.patients[0],
        healthCard: data.patients[0].healthCard,
      });
      setError("");
    } else if (personalId && data && !data.patients?.[0]) {
      setError("პაციენტი ამ პირადი ნომრით ვერ მოიძებნა");
      setPatientData(null);
    }
  }, [data, personalId]);

  const handleAnalyze = async () => {
    if (!patientData) {
      setError("ჯერ მოძებნეთ პაციენტი");
      return;
    }

    if (!symptoms.trim()) {
      setError("გთხოვთ აღწეროთ ამჟამინდელი სიმპტომები");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientData: patientData.patient,
          healthCard: patientData.healthCard,
          currentSymptoms: symptoms.trim(),
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError("ანალიზი ვერ შესრულდა");
        return;
      }

      setAnalysis(result.analysis);
    } catch (err) {
      setError(
        "შეცდომა: " + (err instanceof Error ? err.message : "უცნობი შეცდომა")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>ხელოვნური ინტელექტის სიმპტომების ანალიზის ასისტენტი</h1>
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "2px solid #007bff",
          borderRadius: "8px",
        }}
      >
        <h2>ნაბიჯი 1: პაციენტის პირადი ნომერი</h2>
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>პირადი ნომერი:</strong>
            <input
              type="text"
              value={personalId}
              onChange={(e) => setPersonalId(e.target.value)}
              placeholder="შეიყვანეთ 11-ნიშნა პირადი ნომერი"
              style={{ marginLeft: "10px", padding: "8px", width: "300px" }}
              maxLength={11}
            />
          </label>
          {fetchingPatient && (
            <span style={{ marginLeft: "10px", color: "#007bff" }}>
              🔍 ძებნა...
            </span>
          )}
        </div>
        {patientData && (
          <div
            style={{
              backgroundColor: "#d4edda",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>✅ პაციენტი ნაპოვნია</h3>
            <p>
              <strong>სახელი:</strong> {patientData.patient.fullName}
            </p>
            <p>
              <strong>ასაკი:</strong> {patientData.patient.age} წელი
            </p>
            <p>
              <strong>სქესი:</strong> {patientData.patient.sex}
            </p>
            <p>
              <strong>წონა:</strong> {patientData.patient.weight} კგ
            </p>
            <p>
              <strong>სიმაღლე:</strong> {patientData.patient.height} სმ
            </p>
            <p>
              <strong>მობილურის ნომერი:</strong>{" "}
              {patientData.patient.phoneNumber}
            </p>
          </div>
        )}
      </div>
      {patientData && (
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "2px solid #ffc107",
            borderRadius: "8px",
          }}
        >
          <h2>ნაბიჯი 2: ამჟამინდელი სიმპტომები</h2>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="აღწერეთ რა აწუხებს პაციენტს ახლა..."
            style={{
              padding: "10px",
              width: "100%",
              minHeight: "120px",
              fontFamily: "sans-serif",
            }}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "ანალიზი მიმდინარეობს..." : "სიმპტომების ანალიზი"}
          </button>
        </div>
      )}

      {error && (
        <div
          style={{
            color: "red",
            marginTop: "20px",
            fontWeight: "bold",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "5px",
          }}
        >
          ⚠️ {error}
        </div>
      )}
      {analysis && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>ანალიზის შედეგები</h2>

          {analysis.patientSummary && (
            <div
              style={{
                marginBottom: "20px",
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h3>📋 პაციენტის ჯანმრთელობის შეჯამება:</h3>
              <p>{analysis.patientSummary}</p>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <h3>
              გადაუდებლობის დონე:{" "}
              <span
                style={{
                  color:
                    analysis.urgencyLevel === "urgent"
                      ? "red"
                      : analysis.urgencyLevel === "moderate"
                      ? "orange"
                      : "green",
                  fontWeight: "bold",
                }}
              >
                {analysis.urgencyLevel?.toUpperCase()}
              </span>
            </h3>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>🔍 შესაძლო მდგომარეობები:</h3>
            {analysis.differentialDiagnosis?.map((dx, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                }}
              >
                <strong style={{ fontSize: "16px" }}>
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

          {analysis.redFlags && analysis.redFlags.length > 0 && (
            <div
              style={{
                marginBottom: "20px",
                backgroundColor: "#fff3cd",
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #ffc107",
              }}
            >
              <h3>🚨 საჭიროებს ყურადღებას:</h3>
              <ul>
                {analysis.redFlags.map((flag, i) => (
                  <li key={i} style={{ marginBottom: "5px" }}>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <h3>💡 რეკომენდირებული ტესტები:</h3>
            <ul>
              {analysis.suggestedTests?.map((test, i) => (
                <li key={i} style={{ marginBottom: "5px" }}>
                  {test}
                </li>
              ))}
            </ul>
          </div>

          {analysis.clarifyingQuestions &&
            analysis.clarifyingQuestions.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3>❓ დამატებითი შეკითხვები:</h3>
                <ul>
                  {analysis.clarifyingQuestions.map((q, i) => (
                    <li key={i} style={{ marginBottom: "5px" }}>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
