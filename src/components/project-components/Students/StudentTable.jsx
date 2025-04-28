import React, { useState, useEffect } from "react";
import { deleteStudent, fetchStudents, showStudetnt } from "../../../Api/studentApi";
import Pagination from "../../ui-components/Pagination";
import Spinner from "../../ui-components/Spinner";
import Button from "../../ui-components/Button";
import ShowDetalisModel from "../../ui-components/ShowDetalisModel";
import CustomTable from "../../ui-components/CustomTable";
import { actions } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isWaiting, setIsWaiting] = useState(false);
    const [error, setError] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentId, setStudentId] = useState(null);

    const [ShowDetalisModalOpen, setShowDetalisModalOpen] = useState(false);
    const [showDetalisStudent, setShowDetalisStudent] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const { students, last_page } = await fetchStudents();
                setStudents(students);
                setTotalPages(last_page);
            } catch (error) {
                setError("حدث خطأ أثناء تحميل البيانات 😥");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, []);

    // const handlePageChange = (pageNumber) => {
    //     if (pageNumber >= 1 && pageNumber <= totalPages) {
    //         setCurrentPage(pageNumber);
    //     }
    // };

    const confirmDelete = () => {
        if (studentId) {
            deleteStudent(studentId)
                .then(() => {
                    setStudents(prev => prev.filter(s => s.id !== studentId));
                    setTimeout(() => {}, 3000);
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const handleDelete = (student_id) => {
        setStudentId(student_id);
        setShowDeleteModal(true)
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
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)} 
                onClick={confirmDelete}
                title="Delete Student"
                message="do you confirm to delete 'name' student"
                
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
                    columns={[ "name","uni_number","father_name","mother_name","Operation"]}
                    data={students}
                    renderRow={(student) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={student.id}>
                        <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                                {/* <!-- Avatar with inset shadow --> */}
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
                                    <p className="font-semibold">{student.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {student.students.category?.name || 'not categoried'}
                                    </p>
                                </div>
                            </div>
                        </td>

                        <td className="px-4 py-3 text-sm">
                            {student.email}
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
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path d={a.d} fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                )))}
                            </div>
                        </td>
                    </tr>
                        //         <div className="flex justify-center gap-2">
                        //             <Button name="" signal="👁️"
                        //                 onClick={() => handelDetalis(student.id)}
                        //                 variant="info"
                        //                 iconPosition="start"
                        //                 size="small"
                        //                 transparentBackground={true}
                        //                 hoverText="عرض التفاصيل"
                        //             />
                        //             <Button name="" signal="✏️"
                        //                 onClick={() => handleEdit(student.id)}
                        //                 variant="primary"
                        //                 iconPosition="start"
                        //                 transparentBackground={true}
                        //                 size="small"
                        //                 hoverText="تعديل"

                        //             />
                        //         </div>
                        //     </td>
                        // </tr>
                    )}
                />
            )}
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            /> */}

            {/* 
            <ShowDetalisModel
                isOpen={ShowDetalisModalOpen}
                onClose={() => setShowDetalisModalOpen(false)}
                fields={showDetalisStudent}
            /> */}
        </div>
    );
};
export default StudentTable;