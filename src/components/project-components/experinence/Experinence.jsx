import { useContext, useEffect, useState } from "react";
import MainContent from "../layout/MainContent";
import ExperinenceTable from "./experinenceTable";
import { fetchExperinence, toggleExperinenceStatus, deleteExperinence, updateExperinence, createExperinence } from "../../../api/experinence";
import LangContext from "../../../context/LangContext";
import Button from "../../ui-components/Button";
import { langs } from "../../../lang/langs";
import { authLang } from "../../../lang/authLang";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import FlexButton from "../../ui-components/FlexButton";
import PopupExperiment from "../../ui-components/PopupExperiment";

const Experinence = ({ name, description }) => {

    const { lang, setLang } = useContext(LangContext)
    const [experiences, setExperiences] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showstart, setShowStart] = useState(false);
    const [add, setAdd] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [error, setError] = useState(null);

    const [experinence_id, setExperinenceId] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [id, setId] = useState();
    const [experinenceName, setExperinenceName] = useState("");
    const [beforeInstruction, setBeforeInstruction] = useState("");
    const [afterInstruction, setAfterInstruction] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getData = async () => {
        try {
            setIsWaiting(true);
            const data = await fetchExperinence();
            setExperiences(data);
        } catch (error) {
            setError("An error occurred while loading data 😥");
        } finally {
            setIsWaiting(false);
        }
    };

    useEffect(() => {
        getData();
    }, [isSubmitting === false]);

    const handleDelete = (experinence_id) => {
        setExperinenceId(experinence_id);
        setShowDeleteModal(true);
    }

    const confirmDelete = async () => {
        try {
            await deleteExperinence(experinence_id);
            setExperiences(prev => prev.filter(s => s.id !== experinence_id));
            setShowDeleteModal(false);
        } catch (err) {
            setError("Failed to delete");
        }
    };

    const toggleStatus = async (id) => {
        try {
            await toggleExperinenceStatus(id);
            setExperiences(prev =>
                prev.map(exp =>
                    exp.id === id ? { ...exp, status: exp.status === 1 ? 0 : 1 } : exp
                )
            );
        } catch (err) {
            console.error("Error toggling status:", err);
            setError("Failed to update status");
        }
    };

    const onEdit = (obj) => {
        setId(obj.id)
        setExperinenceName(obj.name);
        setBeforeInstruction(obj.before_instruction);
        setAfterInstruction(obj.after_instruction);
        setShowModal(true)
    }

    const formFields = [
        { label: "name_experince", value: experinenceName, onChange: (e) => setExperinenceName(e.target.value), required: true },
        { label: "before_instruction", value: beforeInstruction, onChange: (e) => setBeforeInstruction(e.target.value), required: true, type: "textarea" },
        { label: "after_instruction", value: afterInstruction, onChange: (e) => setAfterInstruction(e.target.value), required: true, type: "textarea" },
    ];

    const handleSubmit = async (e , isAdd) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!isAdd) {
                await updateExperinence(id, {
                    name: experinenceName,
                    before_instruction: beforeInstruction,
                    after_instruction: afterInstruction,
                });
                setExperiences(prev =>
                    prev.map(exp =>
                        exp.id === id
                            ? { ...exp, experinenceName, before_instruction: beforeInstruction, after_instruction: afterInstruction }
                            : exp
                    )
                );
            } else {
                const newExp = await createExperinence({
                    name: experinenceName,
                    before_instruction: beforeInstruction,
                    after_instruction: afterInstruction,
                });
                setExperiences(prev => [...prev, newExp]);
            }
            setShowModal(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MainContent name={name} description={description}>
            <PopupExperiment isOpen={showstart} onClose={() => setShowStart(false)} />

            <ExperinenceTable
                data={experiences}
                onEdit={onEdit}
                setData={setExperiences}
                reloadData={getData}
                isWaiting={isWaiting}
                error={error}
                toggleStatus={toggleStatus}
                confirmDelete={confirmDelete}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDelete={handleDelete}
            />

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setId("")
                    setExperinenceName('');
                    setBeforeInstruction('');
                    setAfterInstruction('');   
                    setAdd(true)     
                }}
                handleSubmit={add ? (e) => handleSubmit(e,true) : handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={add ? "Add Experience" : "Edit Experience"}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                submitButtonVariant="primary"
            />}

            <div className="fixed bottom-4 right-6">
            <button
                onClick={() => {
                setShowStart(true);
                }}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 dark:text-white shadow-lg transition-all duration-300"
            >
                <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                <path fillRule="evenodd" d="M6.5 5.5v9l8-4.5-8-4.5z" clipRule="evenodd" />
                </svg>
            </button>
            </div>
            <FlexButton 
                label={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Experinence} 
                signal="+"
                onClick={() => {
                    setShowModal(true)
                    setAdd(true)
                }}
            />
        </MainContent>
    );
}
export default Experinence;