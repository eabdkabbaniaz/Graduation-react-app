import React, { useState, useEffect } from "react";
import { deleteStudent, fetchStudents, showStudetnt } from "../../../Api/studentApi";
import Pagination from "../../ui-components/Pagination";
import Spinner from "../../ui-components/Spinner";
import Button from "../../ui-components/Button";
import DeleteConfirmationModal from "../../ui-components/DeleteConfirmationModal";
import ShowDetalisModel from "../../ui-components/ShowDetalisModel";
import ReusableTable from "../../ui-components/ReusableTable";

const EmployeeTable = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isWaiting, setIsWaiting] = useState(false);
    const [error, setError] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);


    const [ShowDetalisModalOpen, setShowDetalisModalOpen] = useState(false);
    const [showDetalisStudent, setShowDetalisStudent] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const { students, last_page } = await fetchStudents(currentPage);
                setStudents(students);
                setTotalPages(last_page);
            } catch (error) {
                setError("حدث خطأ أثناء تحميل البيانات 😥");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [currentPage]);

    useEffect(() => {
        console.log("تم تحميل الطلاب:", students);
    }, [students]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            deleteStudent(studentToDelete)
                .then(() => {
                    setStudents(prev => prev.filter(s => s.id !== studentToDelete));
                    setSuccessMessage("✅ تم الحذف بنجاح");
                    setTimeout(() => setSuccessMessage(""), 3000);
                    setDeleteModalOpen(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const handleDelete = (student_id) => {
        setStudentToDelete(student_id);
        setDeleteModalOpen(true);
        console.log("student_id" + student_id);
    }

    const handelDetalis = async (student_id) => {
        try {
            const { student } = await showStudetnt(student_id);
            const fields = [
                { label: 'الاسم', value: student.name, isLtr: true },
                { label: 'الرقم الجامعي', value: student.email, isLtr: true },
                { label: 'الفئة', value: student.students?.category?.name || 'غير محددة', isLtr: false },
                { label: 'اسم الأب', value: 'أحمد', isLtr: false },
                { label: 'اسم الأم', value: 'يارا', isLtr: false },
            ];
            console.log(student);
            setShowDetalisStudent(fields);
            setShowDetalisModalOpen(true);
        } catch (error) {
            console.error("فشل في جلب تفاصيل الطالب", error);
            setError("فشل في جلب التفاصيل");
        }
    };

    return (
        <div>
            {error && (
                <div className="text-center text-red-600 font-bold py-4">
                    {error}
                </div>
            )}
            {isWaiting ? (
                <Spinner />
            ) : (
                <ReusableTable
                    columns={["id", "اسم الطالب", "الرقم الجامعي", "الفئة", 'اسم الاب', 'اسم الام', 'الاجراء']}
                    data={students}
                    renderRow={(student) => (
                        <tr key={student.id} className="font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 text-center">
                            <td className="px-4 py-3">{student.id}</td>
                            <td className="px-4 py-3">{student.name}</td>
                            <td className="px-4 py-3">{student.email}</td>
                            <td className="px-4 py-3">{student.students.category?.name || 'غير مصنّف'}</td>
                            <td className="px-4 py-3">احمد</td>
                            <td className="px-4 py-3">يارا</td>
                            <td className="w-1 text-center">
                                <div className="flex justify-center gap-2">
                                    <Button name="" signal="👁️"
                                        onClick={() => handelDetalis(student.id)}
                                        variant="info"
                                        iconPosition="start"
                                        size="small"
                                        transparentBackground={true}
                                        hoverText="عرض التفاصيل"
                                    />
                                    <Button name="" signal="✏️"
                                        onClick={() => handleEdit(student.id)}
                                        variant="primary"
                                        iconPosition="start"
                                        transparentBackground={true}
                                        size="small"
                                        hoverText="تعديل"

                                    />
                                    <Button
                                        name=""
                                        signal="🗑️"
                                        onClick={() => handleDelete(student.id)}
                                        size="small"
                                        variant="danger"
                                        transparentBackground={true}
                                        hoverText="حذف"
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}

            />
            <ShowDetalisModel
                isOpen={ShowDetalisModalOpen}
                onClose={() => setShowDetalisModalOpen(false)}
                fields={showDetalisStudent}
            />
        </div>
    );
};
export default EmployeeTable;
