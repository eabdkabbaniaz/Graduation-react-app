import { useContext, useEffect, useState } from "react";
import { actions, subjectColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { showAllSemester } from "../../../api/semester";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import Button from "../../ui-components/Button";

export default function SemesterTable() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [semesterId, setSemesterId] = useState();
    const [semesterName, setSemesterName] = useState();
    const [add, setAdd] = useState(false);
    const { lang, setLang } = useContext(LangContext);
    const [semesters, setSemesters] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await showAllSemester();
                setSemesters(data);
            } catch (error) {
                setError("An error occurred while loading the data😥");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const handleDelete = (id, name) => {
        setSemesterName(name);
        setSemesterId(id);
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (semesterId) {
            deleteSemester(semesterId)
                .then(() => {
                    setSemesters(prev => prev.filter(s => s.id !== semesterId));
                    setShowDeleteModal(false);
                    setSemesterName("")
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const onEdit = (obj) => {
        setSemesterId(obj.id)
        setSemesterName(obj.name)
        setShowModal(true)
    }

    // const handleSubmit = async (e, isAdd) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     try {
    //         if(isAdd){
    //             await addSemester({ name: semesterName });
    //         }else {
    //             await editSemester(semesterId, { name: semesterName });
    //             setSemesters(prev =>
    //                 prev.map(exp =>
    //                     exp.id === semesterId
    //                         ? { ...exp } : exp
    //                 )
    //             );
    //         } 
    //         setShowModal(false);
    //     } catch (err) {
    //         setError(" An error occurred during submission");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const formFields = [
        {
            label: "Semester name",
            value: semesterName,
            onChange: (e) => setSemesterName(e.target.value),
            required: true,
            autoFocus: true
        },
    ];

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Semester"
                message={`do you confirm to delete Semester ${semesterName}`}
            />}

            {/* {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setSemesterName("")
                    setSemesterId('');
                    setAdd(false)
                }}
                handleSubmit={add ? (e) => handleSubmit(e, true) : handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={add ? "Add Semester" : "Edit Semester"}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                submitButtonVariant="primary"
            />} */}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={subjectColumns}
                    data={semesters}
                    renderRow={(semester, index) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={semester.id}>

                            <td className="px-4 py-3 text-sm">
                                {index + 1}
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{semester.name}</p>
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
                                                    handleDelete(semester.id, semester.name);
                                                } else if (a.label === "Edit") onEdit?.(semester);
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
                        name={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Semester}
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