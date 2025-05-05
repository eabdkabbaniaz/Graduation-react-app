import React, { useState } from "react";
import Button from "../../ui-components/Button";
import { createStudent, fetchStudents } from "../../../Api/studentApi";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import { useNavigate } from "react-router-dom";

const StudentCreateForm = ({ setData, categories, setError, error }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [universityNumber, setUniversityNumber] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createStudent({
                name,
                university_number: universityNumber,
                category_id: categoryId,
            });

            //// هام جدا جدا: ملاحظة(مشان حدث بيانات الصفحة وهيك بضمن الكل مايصير فين مشاكل)
            const { students } = await fetchStudents();
            setData(students);
            //// هام جدا جدا 

            setName('');
            setUniversityNumber('');
            setCategoryId('');
            setIsModalOpen(false);
            navigate("/students");

        } catch (err) {
            setError("❌ حدث خطأ أثناء الإرسال");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
        },
        {
            label: "uni_number",
            value: universityNumber,
            onChange: (e) => setUniversityNumber(e.target.value),
            required: true,
        },
        {
            label: "category",
            value: categoryId,
            onChange: (e) => setCategoryId(e.target.value),
            required: true,
            type: "select",
            options: [
                { label: "select category ", value: "" },
                ...categories.map(category => ({ label: category.name, value: category.id }))
            ],
        }
    ];

    return (
        <div className="flex justify-end">
            <div className="fixed bottom-4 right-6 mt-4">
                <Button
                    name="Add student"
                    signal="+"
                    onClick={() => {
                        setName('');
                        setUniversityNumber('');
                        setCategoryId('');
                        setIsModalOpen(true);
                    }}
                />
            </div>

            <CreateAcountModalDynmic
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle="Add student"
                formFields={formFields}
                submitButtonText={isSubmitting ? "Add ..." : "Add student"}
                submitButtonVariant="primary"
            />
        </div>
    );
};

export default StudentCreateForm;