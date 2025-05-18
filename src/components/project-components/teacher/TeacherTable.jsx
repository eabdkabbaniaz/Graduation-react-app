import CustomTable from "../../ui-components/CustomTable";
import Spinner from "../../ui-components/Spinner";
import { actions } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";
import { deleteTeacher, fetchTeacher, toggleTeacherStatus } from "../../../api/teacher";
import { useContext, useState } from "react";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import LangContext from "../../../context/LangContext";

const TeacherTable = ({ teachers, setTeacher, isWaiting, error, onEdit }) => {

    const {lang , setLang} = useContext(LangContext);
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teacherId, setTeacherId] = useState(null);
    const handleDelete = (teacher_id) => {
        setTeacherId(teacher_id);
        setShowDeleteModal(true)
    }

    const toggleStatus = async (id) => {
        try {
            await toggleTeacherStatus(id);
            const d = await fetchTeacher();
            setTeacher(d);
        } catch (err) {
            console.error("Error toggling status:", err);
            setError("Failed to update status");
        }
    };
    const confirmDelete = () => {
        if (teacherId) {
            deleteTeacher(teacherId)
                .then(() => {
                    setTeacher(prev => prev.filter(s => s.id !== teacherId));
                    setTimeout(() => { }, 3000);
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };
    return (
        <div>

            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete teacher"
                message="do you confirm to delete teacher"
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
                    columns={["name", "email", "status", "Operation"]}
                    data={teachers}
                    renderRow={(teacher) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={teacher.id}>
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
                                        <p className="font-semibold">{teacher.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                {teacher.email}
                            </td>


                            <td className="px-4 py-3 text-sm">
                                <button onClick={() => toggleStatus(teacher.id)}>
                                    <span className={`px-2 py-1 text-[12px] font-semibold leading-tight rounded-full 
                                                ${teacher.status === 0 ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100" :
                                            "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"}
                                        `}>
                                        {teacher.status === 0 ? authLang[langs[lang]].Inactive : authLang[langs[lang]].Active}
                                    </span>
                                </button>
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
                                                    handleDelete(teacher.id);
                                                } else if (a.label === "Edit") onEdit?.(teacher);
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
                />)}
        </div>
    );

}
export default TeacherTable;