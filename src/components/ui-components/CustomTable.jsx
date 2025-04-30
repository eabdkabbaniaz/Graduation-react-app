import { useContext } from "react";
import LangContext from "../../context/LangContext";
import { authLang } from "../../lang/authLang";
import { langs } from "../../lang/langs";

export default function CustomTable({ columns, data, renderRow }) {

    const {lang, setlang} = useContext(LangContext);

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className={`text-xs font-semibold tracking-wide ${lang === "ar" ? "text-right" : "text-left"} text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800`}>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-4 py-3`}
                                >
                                    {authLang[langs[lang]][col]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {data !== undefined ? data.map((item, idx) => renderRow(item, idx)) : ""}
                    </tbody>
                </table>
            </div>
        </div>
    )
}