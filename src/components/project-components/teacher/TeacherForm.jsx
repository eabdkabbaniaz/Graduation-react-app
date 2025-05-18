import { useEffect, useState } from "react";
import Button from "../../ui-components/Button";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import { createTeacher, updateTeacher } from "../../../api/teacher";

const TeacherForm = ({ teacher, setData }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (teacher) {
            setName(teacher.name);
            setEmail(teacher.email);
            setIsModalOpen(true);
        }
    }, [teacher]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (teacher) {
                await updateTeacher(teacher.id, {
                    name,
                    email: email,
                });
                setData(prev =>
                    prev.map(exp =>
                        exp.id === teacher.id
                            ? { ...exp, name, email: email }
                            : exp
                    )
                );
            } else {
                const newTeach = await createTeacher({
                    name,
                    email: email,
                });
                setData(prev => [...prev, newTeach]);

            }
            setName('');
            setEmail('');
            setIsModalOpen(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        { label: "name", value: name, onChange: (e) => setName(e.target.value), required: true },
        { label: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true },
    ];

    return (
        <div className="flex justify-end">
            <div className="fixed bottom-4 right-6  mt-4">
                <Button
                    name="Add teacher"
                    signal="+"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>


            <CreateAcountModalDynmic
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={teacher ? "Edit teacher" : "Add teacher"}
                formFields={formFields}
                submitButtonText={isSubmitting ? "Adding..." : teacher ? "Update teacher" : "Add"}
                submitButtonVariant="primary"
            />
        </div>
    );


}
export default TeacherForm;