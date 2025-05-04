import { useEffect, useState } from "react";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import { updateStudent } from "../../../Api/studentApi";


const StudentEditForm = ({ student, setData, setError, error }) => {
    console.log(student?.id + "fjhdhkflsjd")
    const [name, setName] = useState('');
    const [universityNumber, setUniversityNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (student) {
            setName(student.name);
            setUniversityNumber(student.email);
        }
        setTimeout(() => {
            setIsModalOpen(true);
        }, 200);
    }, [student]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (student) {
                await updateStudent(student?.id, {
                    name,
                    university_number: universityNumber,
                });
                setData(prev =>
                    prev.map(s =>
                        s.id === student.id ? { ...s, name, email: universityNumber } : s
                    )
                );
                setIsModalOpen(false);
            }
            setName('');
            setUniversityNumber('');
            setIsModalOpen(false);
        } catch (err) {
            setError("❌ حدث خطأ أثناء الإرسال");
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    };



    const formFields = [
        { label: "name", value: name, onChange: (e) => setName(e.target.value), required: true },
        { label: "uni_number", value: universityNumber, onChange: (e) => setUniversityNumber(e.target.value), required: true },
    ];
    return (
        <div>
            <CreateAcountModalDynmic
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle=" update student"
                formFields={formFields}
                submitButtonText={isSubmitting ? "update ..." : "update  "}
                submitButtonVariant="primary"
            />
        </div>
    )
}
export default StudentEditForm;