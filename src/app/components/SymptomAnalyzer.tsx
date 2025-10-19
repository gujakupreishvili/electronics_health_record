"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { Analysis } from "../types";
import { useParams } from "next/navigation";
import React from "react";

export default function SymptomAnalyzer() {
  const [personalId, setPersonalId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [patientData, setPatientData] = useState<any>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const doctorId = params.moreAbout as string;

  useEffect(() => {
    if (doctorId) setPersonalId(doctorId);
  }, [doctorId]);

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

  useEffect(() => {
    if (data?.patients?.[0]) {
      const { healthCard, id, dateOfBirth, createdAt, ...patientOnly } =
        data.patients[0];

      // Clean healthCard
      let cleanHealthCard = null;
      if (healthCard) {
        const {
          id,
          createdByDoctorId,
          createdByHospitalId,
          patientId,
          ...rest
        } = healthCard;
        cleanHealthCard = rest;
      }
      setPatientData({
        patient: patientOnly,
        healthCard: cleanHealthCard,
      });
      setError("");
    } else if (fetchError) {
      setError(`მონაცემთა ბაზის შეცდომა: ${fetchError.message}`);
      setPatientData(null);
    } else if (personalId && data && !data.patients?.[0]) {
      setError("პაციენტი ამ პირადი ნომრით ვერ მოიძებნა");
      setPatientData(null);
    } else {
      setPatientData(null);
      setError("");
    }
  }, [data, personalId, fetchError]);

  const handleAnalyze = async () => {
    if (!patientData) return setError("ჯერ მოძებნეთ პაციენტი");
    if (!symptoms.trim())
      return setError("გთხოვთ აღწეროთ ამჟამინდელი სიმპტომები");

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/ai/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientData: patientData.patient,
          healthCard: patientData.healthCard,
          currentSymptoms: symptoms.trim(),
          doctorId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          "ანალიზი ვერ შესრულდა: " + (result.error || "სერვერის შეცდომა")
        );
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

  const renderValue = (value: any) => {
    if (value === null || value === undefined) return "არ არის შეყვანილი";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return value.toString();
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
        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>პაციენტის პირადი ნომერი:</strong>
            <input
              type="text"
              value={personalId}
              readOnly
              placeholder="პირადი ნომერი იტვირთება..."
              style={{
                marginLeft: "10px",
                padding: "8px",
                width: "300px",
                backgroundColor: "#f0f0f0",
                cursor: "not-allowed",
              }}
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
            <h3>პაციენტის ინფორმაცია</h3>
            {Object.entries(patientData.patient).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {renderValue(value)}
              </p>
            ))}

            <hr style={{ margin: "15px 0", borderTop: "1px solid #c3e6cb" }} />
            <h4 style={{ marginBottom: "5px", color: "#258a3d" }}>
              📋 ჯანმრთელობის ბარათის ინფორმაცია
            </h4>

            {patientData.healthCard ? (
              Object.entries(patientData.healthCard).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {renderValue(value)}
                </p>
              ))
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>
                ⚠️ ამ პაციენტისთვის ჯანმრთელობის ბარათი არ არის შექმნილი.
              </p>
            )}
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
            disabled={loading || fetchingPatient || !personalId}
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
            padding: "20px",
            border: "2px solid #28a745",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h2 style={{ color: "#28a745", marginBottom: "15px" }}>
            🤖 AI ანალიზის შედეგები
          </h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              fontFamily: "sans-serif",
            }}
          >
            {analysis.text}
          </pre>
          <div
            style={{
              marginTop: "15px",
              fontSize: "12px",
              color: "#6c757d",
              borderTop: "1px solid #dee2e6",
              paddingTop: "10px",
            }}
          >
            <strong>ანალიზის დრო:</strong>{" "}
            {new Date(analysis.timestamp).toLocaleString("ka-GE")}
          </div>
        </div>
      )}
    </div>
  );
}
