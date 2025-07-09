import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";

export default function ExamRow({exam, lang, actions, onDelete, onEdit}) {
  return (
    <tr
      dir={lang === "ar" ? "rtl" : ""}
      className="text-gray-700 dark:text-gray-400"
      key={exam.id}            
    >
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div className="mr-4">
            <p className="font-semibold">{exam.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {exam.number_of_questions} question /
              {exam.Final_grade} final grade /
              {exam.time} min
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-xs">
        <span
          className={`px-2 py-1 text-[12px] font-semibold leading-tight rounded-full 
            ${
              exam.status === 0
                ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-700"
                : "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
            }`}
        >
          {exam.status === 0
            ? authLang[langs[lang]].Inactive
            : authLang[langs[lang]].Active}
        </span>
      </td>

      <td className="px-4 py-3 text-sm">
        <select className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          {Array.isArray(exam.subject) && exam.subject.length > 0 ? (
            exam.subject.map((s, index) => (
              <option key={index} value={s.subject_id}>
                {s.subject_id}
              </option>
            ))
          ) : (
            <option disabled>لا توجد مواد</option>
          )}
        </select>
      </td>

      <td className="px-4 py-3 text-sm">
        {exam.Start_date} to {exam.End_date}
      </td>

      <td className="px-4 py-3 text-sm">
        <div className="flex items-center space-x-4 text-sm">
          {actions.map((a) => (
            <button
              key={a.id}
              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              aria-label={a.label}
              onClick={() =>
                a.label === "Delete"
                  ? onDelete(exam.id, exam.name)
                  : onEdit(exam)
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d={a.d} fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </button>
          ))}
        </div>
      </td>
    </tr>
  );
}
