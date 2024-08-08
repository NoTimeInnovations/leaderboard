"use client";

// app/problems/page.jsx
import React from "react";
import ProblemsClientComponent from "../components/ProblemsClientComponent";

export default function ProblemsPage() {
  
  
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  return (
    <div className="w-full">
      <ProblemsClientComponent days={days} />
    </div>
  );
}
