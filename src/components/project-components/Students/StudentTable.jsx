import React, { useState } from "react";
import { deleteStudent, importStudents } from "../../../api/studentApi";
import Spinner from "../../ui-components/Spinner";
// import ShowDetalisModel from "../../ui-components/ShowDetalisModel";
import CustomTable from "../../ui-components/CustomTable";
import { actions, studentColumns } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";
import CategoryFilter from "../../ui-components/CategoryFilter";
import { fetchStudetnByCategory } from "../../../api/category";
import Button from "../../ui-components/Button";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import Pagination from "../../ui-components/Pagination";

const StudentTable = ({ setStudents, students, error, isWaiting, categories, onEdit, originalStudents, setIsEditModalOpen, page, setPage, lastPage, isSubmitting, setIsSubmitting }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [studentName, setStudentName] = useState("");
    const [showAll, setShowAll] = useState("عرض الكل");
    const [showModal, setShowModal] = useState(false);

    const [numberOfCategories, setNumberOfCategories] = useState(1);
    const [file, setFile] = useState(null);
    const [distributionMethod, setDistributionMethod] = useState("simple");

    const handleFilter = async (categoryId) => {
        if (!categoryId || categoryId === "عرض الكل") {
            setStudents(originalStudents);
            setSelectedCategoryName("");
            setSelectedCategoryId("عرض الكل");
            return;
        }
        try {
            const data = await fetchStudetnByCategory(categoryId);
            setStudents(data.students);
            const selectedCategory = categories.find((cat) => cat.id === Number(categoryId));
            setSelectedCategoryId(selectedCategory?.id);
            setSelectedCategoryName(selectedCategory?.name || "");
        } catch (err) {
            console.error("فشل في جلب الطلاب:", err);
        }
    };

    const confirmDelete = () => {
        if (studentId) {
            deleteStudent(studentId)
                .then(() => {
                    setStudents(prev => prev.filter(s => s.id !== studentId));
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("An error occurred:", err);
                });
        }
    };

    const handleDelete = (id , name) => {
        setStudentId(id);
        setStudentName(name)
        setShowDeleteModal(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("category_number", numberOfCategories);
        formdata.append("file", file);
        formdata.append("distributionMethod", distributionMethod);   

        setIsSubmitting(true);

        try {
            await importStudents(formdata);

            setNumberOfCategories(0);
            setFile("");
            setDistributionMethod("");
            setShowModal(false);

        } catch (err) {
            console.error("❌ حدث خطأ أثناء الإرسال");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "number of categories",
            value: numberOfCategories,
            onChange: (e) => setNumberOfCategories(e.target.value),
            required: true,
            type: "number",
            min:"1",
        },
        {
            label: "file",
            onChange: (e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
            },
            required: true,
            type: "file",
        },
        {
            label: "distribution method",
            value: distributionMethod,
            onChange: (e) => setDistributionMethod(e.target.value),
            required: true,
            type: "select",
            options: [{ label: "simple", value: "simple" },{ label: "random", value: "random" }],
        }
    ];

    return (
        <div className="p-4">

            <div dir="rtl">
                <Button signal="" name="import students" onClick={() => setShowModal(true)} />
            </div>

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle="import students"
                formFields={formFields}
                submitButtonText={isSubmitting ? "import ..." : "import students"}
                submitButtonVariant="primary"
            />}

            <CategoryFilter
                categories={categories}
                handleFilter={handleFilter}
                selectedCategoryId={selectedCategoryId}
                intialValue={showAll}
            />
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Student"
                message={`do you confirm to delete student ${studentName}`}

            />}
            {error && (
                <div className="text-center text-red-600 font-bold py-4">
                    {error}
                </div>
            )}
            {isWaiting ? (
                <Spinner />
            ) : (
                <CustomTable
                    columns={["name", "uni_number", "father_name", "mother_name", "Operation"]}
                    data={students}
                    renderRow={(student) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={student.id || student.data.id}>
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                        <img
                                            className="object-cover w-full h-full rounded-full"
                                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                            alt=""
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 rounded-full shadow-inner"
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{student.name || student?.data?.name}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {student.students?.category?.name || selectedCategoryName || student?.data?.category_name || 'not categoried'}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3 text-sm">
                                {student.email || student?.data?.email}
                            </td>

                            <td className="px-4 py-3 text-sm">
                                ammar
                            </td>

                            <td className="px-4 py-3 text-sm">
                                lolo
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
                                                    handleDelete(student.id,student.name);
                                                } else if (a.label === "Edit") {
                                                    onEdit(student);
                                                    setIsEditModalOpen(true);
                                                }
                                            }}
                                        >
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path d={a.d} fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    )))}
                                </div>
                            </td>
                        </tr>
                    )}
                />
            )}
            <Pagination currentPage={page} totalPages={lastPage} onPageChange={(p) => setPage(p)} />
        </div>
    );
};
export default StudentTable;