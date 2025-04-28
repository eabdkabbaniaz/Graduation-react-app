import React, { useEffect, useState } from "react";
import Button from "../../ui-components/Button";
import { createStudent } from "../../../Api/studentApi";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import { fetchCategory } from "../../../Api/categories";

const StudentForm = () => {
    const [name, setName] = useState('');
    const [universityNumber, setUniversityNumber] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategory();
                setCategories(data);
            } catch (err) {
                console.log("Error fetching categories:", err);
                setError("❌ حدث خطأ أثناء جلب الفئات");
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createStudent({
                name,
                university_number: universityNumber,
                category_id: categoryId,
            });
            setName('');
            setUniversityNumber('');
            setCategoryId('');

            setIsModalOpen(false);
        } catch (err) {
            setError("❌ حدث خطأ أثناء الإرسال");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        { label: "الاسم", value: name, onChange: (e) => setName(e.target.value), required: true },
        { label: "الرقم الجامعي", value: universityNumber, onChange: (e) => setUniversityNumber(e.target.value), required: true },
        {
            label: "الفئة",
            value: categoryId,
            onChange: (e) => setCategoryId(e.target.value),
            required: true,
            type: "select",
            options: [
                { label: "اختر فئة", value: "" },
                ...categories.map(category => ({ label: category.name, value: category.id }))
            ]
        }
    ];

    return (
        <div className="flex justify-end">
            <div className="fixed bottom-4 right-6  mt-4">
                <Button
                    name="Add student"
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
                modalTitle="إضافة طالب"
                formFields={formFields}
                submitButtonText={isSubmitting ? "جاري الإضافة..." : "إضافة الطالب"}
                submitButtonVariant="primary"
            />
        </div>
    );
};
export default StudentForm;