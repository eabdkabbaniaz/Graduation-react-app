import { useContext, useState } from "react";
import { authLang } from "../../lang/authLang";
import { langs } from "../../lang/langs";
import { menuList } from "../../store/Data";
import LangContext from "../../context/LangContext";
import ExportPopup from "./ExportPopup";
import CreateAcountModalDynmic from "./CreateAcountModalDynmic";
import { getSettingsFormFields } from "../../formFields/settingsFormFields";

export default function CustomMenu(){

    const { lang, setLang } = useContext(LangContext);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showSettingModal, setShowSettingModal] = useState(false);
    const [object, setObject] = useState({
        calculation_method: "",
        final_mark: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const methods = [
        { id: "1", label: "sum" },
        { id: "2", label: "average" },
      ];


    const options = [
        { id: "1", label: "name" },
        { id: "2", label: "final_grade" },
        { id: "3", label: "assessment_score" },
        { id: "4", label: "exam_score" },
        { id: "5", label: "attendance_average" },
      ];

    const handleMenuClick = (label) => {
        switch (label) {
          case menuList.at(0).label:
            setShowExportModal(true)
            break;
          case menuList.at(1).label:
            setShowSettingModal(true)
            break;
          default:
            console.warn("No handler for", label);
        }
      };

      const formFields = getSettingsFormFields(object, setObject, methods);

    return (
        <>
                <ExportPopup
                    isOpen={showExportModal}
                    onClose={() => setShowExportModal(false)}
                    options={options}
                />

                <CreateAcountModalDynmic
                    isOpen={showSettingModal}
                    onClose={() => setShowSettingModal(false)}
                    // handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    error={error}
                    modalTitle="Advance settings"
                    formFields={formFields}
                    submitButtonText={isSubmitting ? "save ..." : "save"}
                    submitButtonVariant="primary"
                />

        <div className="flex justify-end">
            <div className="fixed top-[130px] right-[150px]">
            <ul className="absolute w-[143px] p-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                {menuList.map((menu) => (
                    <li key={menu.id} className="flex">
                   <a className={`inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md 
                            cursor-pointer hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200`}
                        onClick={() => handleMenuClick(menu.label)}        
                    >
                        <span>{menu.label}</span>
                    </a>

                </li>
                ))}  
            </ul>
            </div>
        </div>
        </>
    )
}
