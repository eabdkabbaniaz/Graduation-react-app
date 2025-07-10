import { useContext, useEffect, useState } from "react";
import { marksColumns, subjectColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import Spinner from "../../ui-components/Spinner";
import { exportMarks, getMarks, userMarkDetails } from "../../../api/marks";
import FlexButton from "../../ui-components/FlexButton";
import DeleteModal from "../../ui-components/DeleteModal";
import ExportPopup from "../../ui-components/ExportPopup";
import FlexIcon from "../../ui-components/FlexIcon";
import ListLanguages from "../layout/Tools/language/ListLanguages";
import CustomMenu from "../../ui-components/CustomMenu";
import DataPopup from "../../ui-components/DataPopup";

export default function MarksTable() {

    const [add, setAdd] = useState(false);
    const { lang, setLang } = useContext(LangContext);
    const [marks, setMarks] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDataModal, setShowDataModal] = useState(false);
    const [markDetails, setMarkDetails] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getMarks();
                setMarks(data);
            } catch (error) {
                setError("An error occurred while loading the data😥");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const handleMarkDetails = async (id) => {
        try {
            const data = await userMarkDetails(id);
            setMarkDetails(data)
            setShowDataModal(true);
        } catch (err) {
            console.log("An error occurred during submission");
        }         
    };


    return (
        <>
            {showDataModal && <DataPopup
                    data={markDetails}
                    onClose={() => setShowDataModal(false)} // مهم!
                />}
                
            {showModal && <CustomMenu />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={marksColumns}
                    data={marks}
                    renderRow={(mark) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400 cursor-pointer" key={mark.user_id} onClick={() => {handleMarkDetails(mark.user_id)}}>

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{mark.user_name}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{mark.exam_score}</p>
                                    </div>
                                </div>
                            </td>


                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{mark.assessment_score}</p>
                                    </div>
                                </div>
                            </td>


                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{mark.attendance_average}</p>
                                    </div>
                                </div>
                            </td>


                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{mark.final_grade}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                />)}
            <FlexIcon onClick={() => setShowModal(!showModal)}  />
        </>
    )
}