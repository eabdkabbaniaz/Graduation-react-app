import { useContext, useEffect, useState } from "react";
import { actions, examColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { addExam, deleteExam, editExam, getExam } from "../../../api/exam";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import { getSubject } from "../../../api/subject";
import FlexButton from "../../ui-components/FlexButton";
import { getExamFormFields } from "../../../formFields/examFormFields";
import ExamRow from "./ExamRow";

export default function ExamTable() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [examName, setExamName] = useState();
    const [examId, setExamId] = useState();
    const { lang, setLang } = useContext(LangContext);
    const [exams, setExams] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [object, setObject] = useState({ 
        name: "", 
        number_of_questions: 0,
        Final_grade:0, 
        Start_date: "",
        End_date: "",
        subject_id: [],
        time:0 
    });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [add, setAdd] = useState(false);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const dataExam = await getExam();
                setExams(dataExam);
                const data = await getSubject();
                setSubjects(data);
            } catch (error) {
                setError("An error occurred while loading the data");
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
        setExamId(obj.id)
        setObject({
            ...object,
            name: obj.name,
            number_of_questions: obj.number_of_questions,
            Final_grade: obj.Final_grade, 
            Start_date: obj.Start_date,
            End_date: obj.End_date,
            subject_id: obj.subject_id?.map((d) => d.id),
            time:obj.time    
        });
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if(isAdd){
                await addExam(object);
            }else{
                await editExam(examId, object);
            }
            setShowModal(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = getExamFormFields(object, setObject, subjects);

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
                onClose={() => {
                    setShowModal(false)
                    setObject({
                        name: "", 
                        number_of_questions: 0,
                        Final_grade:0, 
                        Start_date: "",
                        End_date: "",
                        subject_id: [],
                        time:0 
                    })
                    setError("")
                    setAdd(false)
                }}
                handleSubmit={add ? (e) => handleSubmit(e,true) : (e) => handleSubmit(e,false)}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={add ? "Add Exam" :`Edit Exam`}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
                submitButtonVariant="primary"
                size="h-[600px] overflow-y-scroll"
            />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={examColumns}
                    data={exams}
                    renderRow={(exam) => (
                        <ExamRow key={exam.id} exam={exam} lang={lang} actions={actions} onDelete={handleDelete} onEdit={onEdit} />
                    )}
                />)}
            <FlexButton 
                label={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Exam} 
                signal="+"
                onClick={() => {
                    setShowModal(true)
                    setAdd(true)
                }}
            />
        </>
    )
}