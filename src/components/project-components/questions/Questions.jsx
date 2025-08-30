import { useEffect, useState } from "react";
import DeleteModal from "../../ui-components/DeleteModal";
import { addQustion, deleteQustion, editQustion, getQuestions } from "../../../api/question";
import Spinner from "../../ui-components/Spinner";
import QuestionsList from "../../ui-components/QuestionsList";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic"
import Button from "../../ui-components/Button";
import { getSubject } from "../../../api/subject";

export default function Questions() {
    
    const role = localStorage.getItem("role");

    const [questionId, setQuestionId] = useState(null);
    const [index, setIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [object, setObject] = useState({});
    const [n, setN] = useState(2);
    const [submitObject, setSubmitObject] = useState({
        question: "",
        subject_id: 1,
        answers: [{}]
    });
    const [error, setError] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getQuestions();
                const dataSubject = await getSubject();
                setSubjects(dataSubject);
                setQuestions(data);
            } catch (error) {
                setError("An error occurred while loading the data");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    useEffect(() => {
        const answersArray = Array.from({ length: Number(n) }, (_, i) => ({
            Answer: "",
            is_correct: false,
        }));
        setSubmitObject(prev => ({ ...prev, answers: answersArray }));
    }, [n]);

    const handleDelete = (id, index) => {
        setIndex(index);
        setQuestionId(id);
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (questionId) {
            deleteQustion(questionId)
                .then(() => {
                    setQuestions(prev => prev.filter(s => s.id !== questionId));
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const onEdit = (obj, index) => {
        setIndex(index);
        setObject(obj);
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        e.preventDefault();

        let updatedObject = { ...submitObject };

        if (!submitObject.answers?.some(answer => answer.is_correct === 1)) {
            const updatedAnswers = submitObject.answers.map((answer, index) => ({
                ...answer,
                is_correct: index === 0 ? true : false
            }));
            updatedObject = { ...updatedObject, answers: updatedAnswers };
            setSubmitObject(updatedObject);
        }

        setIsSubmitting(true);
        try {
            if (isAdd) {
                await addQustion(updatedObject);
                setShowAddModal(false);
                setSubmitObject({
                    question: "",
                    subject_id: 1,
                    answers: [{}]
                })
                setN(2)

            } else {
                await editQustion(object.id, object);
                setShowModal(false);
            }
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "question",
            value: object.question,
            onChange: (e) => setObject({ ...object, question: e.target.value }),
            required: true,
        },
        {  
            label: "Drugs",
            type: "select",
            value: object.subject_id || '',
            onChange: (e) => {
                setObject({
                    ...object,
                    subject_id: e.target.value
                });
            },
            options: Array.isArray(subjects)
                ? subjects.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                }))
                : [],
            required: true,
        },
        ...(Array.isArray(object.answers)
            ? object.answers.map((answer, index) => ({
                label: `Answer ${index + 1}`,
                value: answer.Answer,
                onChange: (e) => {
                    const updatedAnswers = [...object.answers];
                    updatedAnswers[index] = {
                        ...answer,
                        Answer: e.target.value,
                    };
                    setObject({ ...object, answers: updatedAnswers });
                },
                required: true,
            }))
            : []),
        {
            label: "Choose an Answer",
            type: "select",
            value: object.selectedAnswer || '',
            onChange: (e) => {
                const selected = e.target.value;
                const updatedAnswers = object.answers.map(answer => ({
                    ...answer,
                    is_correct: answer.Answer === selected ? 1 : 0,
                }));

                setObject({
                    ...object,
                    selectedAnswer: selected,
                    answers: updatedAnswers,
                });
            },
            required: true,
            options: Array.isArray(object.answers)
                ? [
                    ...object.answers.filter(answer => answer.is_correct === 1),
                    ...object.answers.filter(answer => answer.is_correct !== 1)
                ].map((answer) => ({
                    value: answer.Answer,
                    label: answer.Answer,
                }))
                : [],
        }
    ];

    const submitFormFields = [
        {
            label: "question",
            value: submitObject.question,
            onChange: (e) => setSubmitObject({ ...submitObject, question: e.target.value }),
            required: true,
        },
        {
            label: "subject",
            value: submitObject.name,
            type: "select",
            onChange: (e) => {
                setSubmitObject({
                    ...submitObject,
                    subject_id: e.target.value,
                });
            },
            options: Array.isArray(subjects)
                ? subjects.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                }))
                : [],

            required: true,
        },
        {
            label: "number of answers",
            type: "number",
            min: "2",
            value: n,
            onChange: (e) => setN(e.target.value),
            required: true,
        },
        ...(Array.isArray(submitObject.answers)
            ? submitObject.answers.map((answer, index) => ({
                label: `Answer ${index + 1}`,
                value: answer.Answer,
                onChange: (e) => {
                    const updatedAnswers = [...submitObject.answers];
                    updatedAnswers[index] = {
                        ...answer,
                        Answer: e.target.value,
                    };
                    setSubmitObject({ ...submitObject, answers: updatedAnswers });
                },
                required: true,
            }))
            : []),
            {
                label: "Choose a correct Answer",
                type: "select",
                value: submitObject.selectedAnswer || '',
                onChange: (e) => {
                    const selected = e.target.value;
                    const updatedAnswers = submitObject.answers.map(answer => ({
                        ...answer,
                        is_correct: answer.Answer === selected ? 1 : 0,
                    }));
    
                    setSubmitObject({
                        ...submitObject,
                        selectedAnswer: selected,
                        answers: updatedAnswers,
                    });
                },
                required: true,
                options: Array.isArray(submitObject.answers)
                    ? [
                        ...submitObject.answers.filter(answer => answer.is_correct === 1),
                        ...submitObject.answers.filter(answer => answer.is_correct !== 1)
                    ].map((answer) => ({
                        value: answer.Answer,
                        label: answer.Answer,
                    }))
                    : [],
            }
    ];

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Question"
                message={`do you confirm to delete Question ${index}`}
            />}

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={`Edit Question ${index}`}
                formFields={formFields}
                submitButtonText={isSubmitting ? "editing..." : "edit"}
                submitButtonVariant="primary"
            />}

            {showAddModal && <CreateAcountModalDynmic
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                handleSubmit={(e) => handleSubmit(e, true)}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={`Add Question`}
                formFields={submitFormFields}
                submitButtonText={isSubmitting ? "adding..." : "add"}
                submitButtonVariant="primary"
                size="h-[700px] overflow-y-scroll"
            />}

            {(role === "teacher" || role === "manger") ? "" : <div className="fixed right-[20px] bottom-[20px]">
                <Button name="add question" onClick={() => setShowAddModal(true)} />
            </div>}

            <div dir="rtl" className="max-w-4xl mx-auto border border-black p-4">
                <div className="border border-black p-4 mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-right font-bold text-base leading-tight">
                            جامعة دمشق
                        </div>
                        <div className="text-left text-sm leading-tight">
                        امتحان الدورة:......<br />
                        تاريخ الامتحان:......<br />
                        مدة الامتحان:......<br />
                        العلامة العظمى:..... 
                    </div>
                    </div>
                    <div className="text-center font-bold text-lg mb-1">كلية الصيدلة </div>
                    <div className="text-center font-semibold text-base mb-1">
                        قسم دراسة تأثير الأدوية على الحيوانات
                    </div>
                    <div className="text-center underline text-sm mb-2">بنك الأسئلة</div>
                    <div className="text-right text-sm font-semibold">
                        اسم الطالب : ............................................................................
                    </div>
                </div>
                {isWaiting ? (<Spinner />) : (
                    <QuestionsList questions={questions} handleDelete={handleDelete} onEdit={onEdit} />
                )}
            </div>
        </>
    )
}