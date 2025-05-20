import { useContext, useEffect, useState } from "react";
import { actions, subjectColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { addSubject, deleteSubject, editSubject, getSubject } from "../../../api/subject";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import Button from "../../ui-components/Button";

export default function SubjectTable() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [subjectId, setSubjectId] = useState();
    const [subjectName, setSubjectName] = useState();
    const [add, setAdd] = useState(false);
    const { lang, setLang } = useContext(LangContext);
    const [subjects, setSubjects] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getSubject();
                setSubjects(data);
            } catch (error) {
                setError("An error occurred while loading the data😥");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const handleDelete = (id, name) => {
        setSubjectName(name);
        setSubjectId(id);
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (subjectId) {
            deleteSubject(subjectId)
                .then(() => {
                    setSubjects(prev => prev.filter(s => s.id !== subjectId));
                    setShowDeleteModal(false);
                    setSubjectName("")
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const onEdit = (obj) => {
        setSubjectId(obj.id)
        setSubjectName(obj.name)
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if(isAdd){
                await addSubject({ name: subjectName });
            }else {
                await editSubject(subjectId, { name: subjectName });
                setSubjects(prev =>
                    prev.map(exp =>
                        exp.id === subjectId
                            ? { ...exp } : exp
                    )
                );
            } 
            setShowModal(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "subject name",
            value: subjectName,
            onChange: (e) => setSubjectName(e.target.value),
            required: true,
            autoFocus: true
        },
    ];

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete subject"
                message={`do you confirm to delete subject ${subjectName}`}
            />}

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setSubjectName("")
                    setSubjectId('');
                    setAdd(false)
                }}
                handleSubmit={add ? (e) => handleSubmit(e, true) : handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={add ? "Add Subject" : "Edit Subject"}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                submitButtonVariant="primary"
            />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={subjectColumns}
                    data={subjects}
                    renderRow={(subject, index) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={subject.id}>

                            <td className="px-4 py-3 text-sm">
                                {index + 1}
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{subject.name}</p>
                                    </div>
                                </div>
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
                                                    handleDelete(subject.id, subject.name);
                                                } else if (a.label === "Edit") onEdit?.(subject);
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
            <div className="flex justify-end">
                <div className="fixed bottom-4 right-6 mt-4">
                    <Button
                        name={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Subject}
                        signal="+"
                        onClick={() => {
                            setShowModal(true)
                            setAdd(true)
                        }}
                    />
                </div>
            </div>
        </>
    )
}