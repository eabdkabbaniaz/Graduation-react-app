import React from "react";

function StepNav({ steps, current = 0, setCurrent }) {
  return (
    <div className="flex justify-end">
      <ol className="flex overflow-hidden rounded-md">
        {steps.map((step, i) => {
          const isActive = i === current;
          const base ="relative cursor-pointer flex items-center px-4 py-2 text-sm font-semibold whitespace-nowrap";
          const color = isActive ? "bg-teal-50 text-teal-800" : "bg-gray-100 text-gray-500";
          return (
            <li key={step} className={`${base} ${color} step`} onClick={() => setCurrent(i)}>
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function QuotationStepper({current, setCurrent}) {
  return (
    <StepNav
      steps={["Medictions","Systems", "Effects"]}
      current={current} 
      setCurrent={setCurrent} 
    />
  );
}
