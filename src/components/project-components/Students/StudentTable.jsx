import React, { useState, useEffect } from "react";
import { deleteStudent } from "../../../Api/studentApi";
import Spinner from "../../ui-components/Spinner";
import CustomTable from "../../ui-components/CustomTable";
import { actions } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";
import CategoryFilter from "../../ui-components/CategoryFilter";
import { fetchStudetnByCategory } from "../../../Api/category";

const StudentTable = ({ setStudents, students, error, isWaiting, categories, onEdit, originalStudents, setIsEditModalOpen }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");

    const handleFilter = async (categoryId) => {
        if (!categoryId) {
            setStudents(originalStudents);
            setSelectedCategoryName("");
            setSelectedCategoryId("");
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


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentId, setStudentId] = useState(null);

    const confirmDelete = () => {
        if (studentId) {
            deleteStudent(studentId)
                .then(() => {
                    setStudents(prev => prev.filter(s => s.id !== studentId));
                    setTimeout(() => { }, 3000);
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("An error occurred:", err);
                });
        }
    };

    const handleDelete = (student_id) => {
        setStudentId(student_id);
        setShowDeleteModal(true)
    }


    return (
        <div className="p-4">
            <CategoryFilter
                categories={categories}
                handleFilter={handleFilter}
                selectedCategoryId={selectedCategoryId}
            />
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Student"
                message="do you confirm to delete student"

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
                                                    handleDelete(student.id);
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
        </div>
    );
};
export default StudentTable;