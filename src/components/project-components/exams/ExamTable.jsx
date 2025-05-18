import { useContext, useEffect, useState } from "react";
import { actions, examColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { deleteExam, editExam, getExam } from "../../../api/exam";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";

export default function ExamTable() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [examName, setExamName] = useState();
    const [examId, setExamId] = useState();
    const { lang, setLang } = useContext(LangContext);
    const [exams, setExams] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [object, setObject] = useState({ id: "", name: "", drug_ids: [] });
    const [id, setId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getExam();
                setExams(data);
            } catch (error) {
                setError("An error occurred while loading the data😥");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const handleDelete = (id, name) => {
        setExamName(name);
        setExamId(id);
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (examId) {
            deleteExam(examId)
                .then(() => {
                    setExams(prev => prev.filter(s => s.id !== examId));
                    setTimeout(() => { }, 3000);
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const onEdit = (obj) => {
        setId(obj.id)
        setObject({
            ...object,
            name: obj.name,
            drug_ids: obj.drug?.map((d) => d.id),
        });
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        if (isAdd) {
            console.log(isAdd)
        }
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await editExam(id, object);
            setExams(prev =>
                prev.map(exp =>
                    exp.id === object.id
                        ? { ...exp, object } : exp
                )
            );
            setShowModal(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "name",
            value: object.name,
            onChange: (e) => setObject({ ...object, name: e.target.value }),
            required: true,
        },
        
    ];

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Exam"
                message={`do you confirm to delete Exam ${examName}`}
            />}

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={`Edit Exam ${object.name}`}
                formFields={formFields}
                submitButtonText={isSubmitting ? "editing..." : "edit"}
                submitButtonVariant="primary"
            />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={examColumns}
                    data={exams}
                    renderRow={(exam) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={exam.id}>
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
                                <span className={`px-2 py-1 text-[12px] font-semibold leading-tight rounded-full 
                                                ${exam.status === 0 ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-700" :
                                        "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"}
                                        `}>
                                    {exam.status === 0 ? authLang[langs[lang]].Inactive : authLang[langs[lang]].Active}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-sm">
                                <select className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                    {Array.isArray(exam.subject) && exam.subject.length > 0 ? (
                                        exam.subject.map((drug, index) => (
                                            <option key={index} value={drug.name}>
                                                {drug.subject_id}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>لا توجد أدوية</option>
                                    )}
                                </select>
                            </td>

                            <td className="px-4 py-3 text-sm">
                                {exam.Start_date} to {exam.End_date}
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
                                                    handleDelete(exam.id, exam.name);
                                                } else if (a.label === "Edit") onEdit?.(exam);
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