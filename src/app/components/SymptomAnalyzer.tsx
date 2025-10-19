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
    setAnalysis(null);

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
            <p>
              <strong>ოჯახური მდგომარეობა:</strong>{" "}
              {patientData.patient.martialStatus}
            </p>

            <hr style={{ margin: "15px 0", borderTop: "1px solid #c3e6cb" }} />
            <h4 style={{ marginBottom: "5px", color: "#258a3d" }}>
              📋 ჯანმრთელობის ბარათის ინფორმაცია (ისტორია)
            </h4>

            {patientData.healthCard ? (
              <React.Fragment>
                <p>
                  <strong>ბარათის ნომერი:</strong>{" "}
                  {patientData.healthCard.cardNumber}
                </p>
                <p>
                  <strong>ძირითადი საჩივრები (ისტორია):</strong>{" "}
                  {patientData.healthCard.chiefComplaints ||
                    "არ არის შეყვანილი"}
                </p>
                <p>
                  <strong>ბოლო კლინიკური დიაგნოზი:</strong>{" "}
                  {patientData.healthCard.finalClinicalDiagnosisMain ||
                    "არ არის ჩაწერილი"}
                </p>
                <p>
                  <strong>პასუხისმგებელი ექიმი:</strong>{" "}
                  {patientData.healthCard.responsibleDoctorFullName ||
                    "უცნობია"}
                </p>
              </React.Fragment>
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

      {analysis && <div></div>}
    </div>
  );
}
