import { useContext, useEffect, useState } from "react";
import { actions, showSessionColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { addSessionQuestion, deleteSession, deleteSessionQuestion, editSession, showSession } from "../../../api/session";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import Button from "../../ui-components/Button";

export default function Session({ sessionName, sessionId, setShowSession }) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { lang, setLang } = useContext(LangContext);
    const [session, setSession] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [object, setObject] = useState({ session_id: sessionId, questions: [] });
    const [objectQuesion, setObjectQuesion] = useState({ question: "", question_mode: "fixed", question_mark: 0, session_answers: [] });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [add, setAdd] = useState(false);
    const [n, setN] = useState(2);

    const [sessionQuestionId, setSessionQuestionId] = useState();
    const [sessionQuestionName, setSessionQuestionName] = useState(false);

    const isChipDisabled = 
  !objectQuesion.question.trim() || 
  (objectQuesion.question_mode === "dynamic" &&
    (
      objectQuesion.session_answers.length < 2 ||               
      objectQuesion.session_answers.some(ans => !ans.Answer.trim()) ||
      !objectQuesion.session_answers.some(ans => ans.is_correct === true) 
    )
  );

    useEffect(() => {
        const answersArray = Array.from({ length: Number(n) }, (_, i) => ({
            Answer: "",
            is_correct: false,
        }));
        setObjectQuesion(prev => ({ ...prev, session_answers: answersArray }));
    }, [n]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await showSession();
                setSession(data);
            } catch (error) {
                setError("An error occurred while loading the data");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const handleDelete = (id, name) => {
        setSessionQuestionName(name);
        setSessionQuestionId(id);
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (sessionQuestionId) {
            deleteSessionQuestion(sessionQuestionId)
                .then(() => {
                    setSession(prev => prev.filter(s => s.id !== sessionQuestionId));
                    setTimeout(() => { }, 3000);
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const onEdit = (obj) => {
        console.log(obj)
        setObjectQuesion({
            question: obj.question,
            question_mode: obj.question_mode,
            session_id: 0,
            session_answers: obj.session_answers,
        });
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        e.preventDefault();

        if ((!object.questions || object.questions.length === 0) && isAdd) {
            setError("يجب إضافة سؤال واحد على الأقل قبل الإرسال");
            return;
        }

        const payload = {
            session_id: object.session_id,
            questions: object.questions.map((q) => {
              if (q.question_mode === "fixed") {
                return {
                  question: q.question,
                  question_mark: q.question_mark,
                  question_mode: q.question_mode,
                  answers: []   
                };
              }
          
              return {
                question: q.question,
                question_mark: q.question_mark,
                question_mode: q.question_mode,
                answers: (q.session_answers || [])
                  .filter((ans) => ans.Answer && ans.Answer.trim() !== "")
                  .map((ans) => ({
                    Answer: ans.Answer,
                    is_correct: ans.is_correct ? 1 : 0,
                  })),
              };
            }),
          };
          
        setIsSubmitting(true);
        try {
            if (isAdd) {
                await addSessionQuestion(payload);
            } else {
                await editSession(sessionId, payload);
            }
            setShowModal(false);
            setObject({
                session_id: sessionId, questions: []
            })
            setError("")
            setAdd("")
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "question",
            value: objectQuesion.question,
            type: objectQuesion.question_mode === "fixed" ? "autocomplete" : "text",
            onChange: objectQuesion.question_mode === "fixed"
            ? (event, newValue) => setObjectQuesion({ ...objectQuesion, question: newValue || "" })
            : (event) => setObjectQuesion({ ...objectQuesion, question: event.target.value }),  
            options: [
                "ما هي قيمة Cmax",
                "ما هي الجرعة التي ادت الى  Cmax",
                "ما هي جرعة الادرينالين التي ادت الى موت العضلة",
                "ما هي الجرعة المؤثرة",
                "ما هي الجرعة المؤثرةالمثبطة",
                "ما هي الجرعة المؤثرة المثبطة للمغنزيوم",
                "ما هي جرعة الاتروبين التي حجبت الأستيلكولين بشكل تام",
                "ما هي جرعة الاتروبين التي ادت الى حجب تام",
                "ما هي جرعة الالفا بيتا التي ادت الى حجب تام"
                ,"ما هي اول جرعة من الاتروبين التي ادت الى حجب غير تام"
                ,"ما هي اول جرعة من الالفا بيتا التي ادت الى حجب غير تام"              
            ],
        },
        {
            label: "question mode",
            value: objectQuesion.question_mode,
            type: "select",
            onChange: (e) => setObjectQuesion({ ...objectQuesion, question_mode: e.target.value }),
            options: [
                { label: "fixed", value: "fixed" },
                { label: "dynamic", value: "dynamic" },
            ],
        },
        {
            label: "question mark",
            value: objectQuesion.question_mark,
            onChange: (e) => setObjectQuesion({ ...objectQuesion, question_mark: e.target.value }),
            type: "number",
            min: 0,
        },
        ...(objectQuesion.question_mode === "dynamic"
            ? [
                {
                    label: "number of answers",
                    type: "number",
                    min: "2",
                    value: n,
                    onChange: (e) => setN(e.target.value),
                    required: true,
                },
                ...(Array.isArray(objectQuesion.session_answers)
                    ? objectQuesion.session_answers.map((answer, index) => ({
                        label: `Answer ${index + 1}`,
                        value: answer.Answer ?? "",
                        onChange: (e) => {
                            const updatedAnswers = [...objectQuesion.session_answers];
                            updatedAnswers[index] = {
                                ...answer,
                                Answer: e.target.value,
                            };
                            setObjectQuesion({
                                ...objectQuesion,
                                session_answers: updatedAnswers,
                            });
                        },
                    }))
                    : []),
                {
                    label: "Choose a correct Answer",
                    type: "select",
                    value: objectQuesion.selectedAnswer ?? "",
                    onChange: (e) => {
                        const selected = e.target.value;
                        const updatedAnswers = objectQuesion.session_answers.map((answer) => ({
                            ...answer,
                            is_correct: answer.Answer === selected ? true : false,
                        }));

                        setObjectQuesion({
                            ...objectQuesion,
                            selectedAnswer: selected,
                            session_answers: updatedAnswers,
                        });
                    },
                    required: true,
                    options: Array.isArray(objectQuesion.session_answers)
                        ? [
                            ...objectQuesion.session_answers.filter((answer) => answer.is_correct === true),
                            ...objectQuesion.session_answers.filter((answer) => answer.is_correct !== true),
                        ].map((answer) => ({
                            value: answer.Answer,
                            label: answer.Answer,
                        }))
                        : [],
                },
            ]
            : []),
    ];

    return (
        <>
            <div className="relative flex items-center w-full">
                
                <p className="absolute left-1/2 -translate-x-1/2">
                    {sessionName}
                </p>
                <button className="absolute right-0 text-[30px]" onClick={() => setShowSession(false)}>
                    →
                </button>
                <hr className="w-full mt-8" />
            </div>

            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Session question"
                message={`do you confirm to delete session question ${sessionQuestionName}`}
            />}

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setObject({
                        session_id: sessionId, questions: []
                    })
                    setError("")
                    setAdd(false)
                    setN(2)
                }}
                handleSubmit={add ? (e) => handleSubmit(e, true) : (e) => handleSubmit(e, false)}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={add ? "Add Session Quesion" : `Edit Session Quesion`}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                chips={object.questions}
                addChip="add qustion"
                onAddChip={() => {
                    setObject((prev) => ({
                        ...prev,
                        questions: [
                            ...(prev.questions || []),
                            { ...objectQuesion, session_answers: [...objectQuesion.session_answers] } 
                          ]
                    }));
            
                    setObjectQuesion({
                        question: "",
                        question_mode: "fixed",
                        question_mark: 0,
                        session_answers: []
                    });
                    setN(2);
                }}
                onDeleteChip={(idx) => {
                    setObject((prev) => ({
                        ...prev,
                        questions: prev.questions.filter((_, i) => i !== idx)
                    }));
                }}
                size="h-[700px] overflow-y-scroll"
                isChipDisabled={isChipDisabled} 
            />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={showSessionColumns}
                    data={session}
                    renderRow={(s) => (
                        s.session_id !== sessionId ? "" :
                            <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={s.id}>

                                <td className="px-4 py-3">
                                    <div className="flex items-center text-sm">
                                        <div className="mr-4">
                                            <p className="font-semibold">{s.question}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-3 text-xs">
                                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${s.question_mode === "dynamic" ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100" : "text-red-700 bg-red-100 dark:bg-res-700 dark:text-red-100"}`}>
                                        {s.question_mode}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-xs">
                                    <span className="px-2 py-1 font-semibold leading-tight">
                                        {s.questions_mark}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-sm">
                                    <select
                                        value={
                                            Array.isArray(s.session_answers) && s.session_answers.length > 0
                                                ? s.session_answers.find(ans => ans.is_correct === 1)?.Answer || ""
                                                : ""
                                        }

                                        className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                        {Array.isArray(s.session_answers) && s.session_answers.length > 0 ? (
                                            s.session_answers.map((ans, index) => (
                                                <option disabled key={index} value={ans.Answer}>
                                                    {ans.Answer}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>لا يوجد </option>
                                        )}
                                    </select>
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
                                                        handleDelete(s.id, s.question);
                                                    } else if (a.label === "Edit") onEdit?.(s);
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
                        name={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Question}
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