import { useContext, useState } from "react";
import { actions, subjectColumns } from "../../../../store/Data";
import CustomTable from "../../../ui-components/CustomTable";
import DeleteModal from "../../../ui-components/DeleteModal";
import LangContext from "../../../../context/LangContext";
import { authLang } from "../../../../lang/authLang";
import { langs } from "../../../../lang/langs";
import { addEffect, deleteEffect, editEffect  } from "../../../../api/medications";
import CreateAcountModalDynmic from "../../../ui-components/CreateAcountModalDynmic";
import { getNameFormFields } from "../../../../formFields/nameFormField";
import FlexButton from "../../../ui-components/FlexButton";

export default function EffectTable({effectsList, setEffectsList,isSubmitting, setIsSubmitting}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [add, setAdd] = useState(false);
    const [effName, setEffName] = useState("");
    const [effID, setEffID] = useState("");
    const {lang, setLang} = useContext(LangContext);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = () => {
        if (effID) {
            deleteEffect(effID)
                .then(() => {
                    setEffectsList(prev => prev.filter(s => s.id !== effID));
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const handleSubmit = async (e, isAdd) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if(isAdd){
                await addEffect({name: effName});
            }else{
                await editEffect(effID, {name: effName});
            }
            setShowModal(false);
        } catch (err) {
            console.log(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = getNameFormFields(effName,setEffName);

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)} 
                title="Delete effect"
                message={`do you want to delete ${effName} `}
                onClick={handleDelete}
                // title={authLang[langs[lang]].deleteUniversity}
                // message={authLang[langs[lang]].targetNameDel('"name"',authLang[langs[lang]].University)}
                />}

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setEffName("")
                    setAdd(false)
                }}
                handleSubmit={add ? (e) => handleSubmit(e,true) : (e) => handleSubmit(e,false)}
                isSubmitting={isSubmitting}
                modalTitle={add ? "Add effect" :`Edit effect`}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                submitButtonVariant="primary"
            />}


            <CustomTable
                columns={subjectColumns}
                data={effectsList}
                renderRow={(eff,index) => (
                    <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={eff.id}>
                        <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                                <div className="mr-4">
                                    <p className="font-semibold">{index + 1}</p>
                                </div>
                            </div>
                        </td>

                        <td className="px-4 py-3 text-sm">
                            {eff.name}
                        </td>

                        <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-4 text-sm">
                                {actions.map((a => (
                                    <button
                                        key={a.id}
                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray cursor-pointer"
                                        aria-label={a.label}
                                        onClick={() => {
                                            if (a.label === "Delete") {
                                                setShowDeleteModal(true);
                                            } else if (a.label === "Edit") {
                                                setShowModal(true);
                                            }
                                            setEffName(eff.name);
                                            setEffID(eff.id);
                                            setAdd(false)
                                        }}
                                    >
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path d={a.d} fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                )))}
                            </div>
                        </td>
                    </tr>
                )}
            />
            <FlexButton 
                // label={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Exam} 
                label="Add effect"
                signal="+"
                onClick={() => {
                    setShowModal(true)
                    setAdd(true)
                }}
            />
        </>
    )
}