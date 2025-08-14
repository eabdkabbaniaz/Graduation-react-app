import { useContext } from "react";
import { authLang } from "../../lang/authLang";
import { langs } from "../../lang/langs";
import LangContext from "../../context/LangContext";

function StepNav({ steps, current = 0, setCurrent }) {

  const {lang , setLang} = useContext(LangContext)

  return (
    <div className="flex justify-end">
      <ol className="flex overflow-hidden rounded-md">
        {steps.map((step, i) => {
          const isActive = i === current;
          const base ="relative cursor-pointer flex items-center px-4 py-2 text-sm font-semibold whitespace-nowrap";
          const color = isActive ? "bg-teal-50 text-teal-800 dark:text-gray-200" : "bg-gray-100 text-gray-500 dark:text-gray-500 dark:bg-gray-800";
          return (
            <li key={step} className={`${base} ${color} step`} onClick={() => setCurrent(i)}>
              {authLang[langs[lang]][step.toLowerCase()]}
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
