"use client";
import { useState } from "react";
import { EstimateForm } from "@/app/components/EstimateForm";
import { ResultCard } from "@/app/components/ResultCard";

export default function EstimatePage() {
  const [result, setResult] = useState<any | null>(null);
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <h2 className="text-xl font-semibold">New Estimate</h2>
        <p className="text-gray-600 mb-4">Fill in scope and quantities. You can tweak later.</p>
        <EstimateForm onResult={setResult} />
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Preview</h2>
        <ResultCard result={result} />
      </div>
    </div>
  );
}