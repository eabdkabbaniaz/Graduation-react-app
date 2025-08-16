import { useContext, useEffect, useState } from "react";
import { actions, calculationmethodsColumns, marksColumns, subjectColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import Spinner from "../../ui-components/Spinner";
import FlexButton from "../../ui-components/FlexButton";
import DeleteModal from "../../ui-components/DeleteModal";
import ExportPopup from "../../ui-components/ExportPopup";
import FlexIcon from "../../ui-components/FlexIcon";
import ListLanguages from "../layout/Tools/language/ListLanguages";
import CustomMenu from "../../ui-components/CustomMenu";
import DataPopup from "../../ui-components/DataPopup";
import { getCalculationMethods, postCalculationMethods } from "../../../api/settings";

export default function SettingsTable() {

    const { lang, setLang } = useContext(LangContext);
    const [calculationMethods, setCalculationMethods] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getCalculationMethods();
                setCalculationMethods(data);
            } catch (error) {
                setError("An error occurred while loading the data");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const toggleStatus = async (obj) => {
        let calculation_method = obj.calculation_method;

        if (calculation_method === "sum"){
            calculation_method = "average";
        }else {
            calculation_method = "sum";
        }

        try {
            await postCalculationMethods(obj.id,{calculation_method: calculation_method});
            setCalculationMethods(prev =>
                prev.map(calc =>
                    calc.id === obj.id ? { ...calc, calculation_method: calculation_method} : calc
                )
            );
        } catch (err) {
            console.error("Error toggling status:", err);
        }
    };

    return (
        <>

            {/* {showModal && <CustomMenu />} */}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={calculationmethodsColumns}
                    data={calculationMethods}
                    renderRow={(calc) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={calc.id} >

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{calc.name}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm" onClick={() => toggleStatus(calc)}>
                                    <div className="mr-4 cursor-pointer">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-full 
                                             ${calc.calculation_method === "sum" ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100" : "text-red-700 bg-red-100 dark:bg-red-700 "}`}>
                                            {calc.calculation_method}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{calc.final_mark}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3 text-sm">
                                <div className="flex items-center space-x-4 text-sm">
                                    {actions.map((a => (
                                        a.label === "Edit" && <button
                                            key={a.id}
                                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray cursor-pointer"
                                            aria-label={a.label}
                                            onClick={() => {
                                                if (a.label === "Edit") onEdit?.(calc);
                                            }}                                    >
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path d={a.d} fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    )))}
                                </div>
                            </td>

                        </tr>
                    )}
                />)}
        </>
    )
}