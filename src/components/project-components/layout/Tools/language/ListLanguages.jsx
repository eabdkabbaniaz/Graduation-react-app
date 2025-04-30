import { useContext } from "react";
import LangContext from "../../../../../context/LangContext";
import { languageList } from "../../../../../store/Data";
import { authLang } from "../../../../../lang/authLang";
import { langs } from "../../../../../lang/langs";

export default function ListLanguages() {
    const { lang, setLang } = useContext(LangContext);

    const selectLanguage = (language) => {
        if (language === "Arabic"){
            setLang("ar");
        }else {
            setLang("en");
        }
      };

    return (
        <div>
            <ul className="absolute ml-[-35px] w-36 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                {languageList.map((l) => (
                    <li key={l.id} className="flex">
                    <a 
                    className={`inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md  
                    ${lang == l.lang.slice(0,2).toLowerCase() ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" : "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"}`}
                    onClick={() => selectLanguage(l.lang)}
                    >
                        <span>{authLang[langs[lang]][l.lang]}</span>
                    </a>
                </li>
                ))}  
            </ul>
        </div>
    )
}