import CustomTable from "../../ui-components/CustomTable";
import Spinner from "../../ui-components/Spinner";
import { actions } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";
import { createTeacher, deleteTeacher, fetchTeacher, toggleTeacherStatus, updateTeacher, updateTeacherRole } from "../../../api/teacher";
import { useContext, useState } from "react";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import LangContext from "../../../context/LangContext";
import FlexButton from "../../ui-components/FlexButton";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";

const TeacherTable = ({ teachers, setTeacher, isWaiting, setIsWaiting, error, setError }) => {

    const { lang, setLang } = useContext(LangContext);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [add, setAdd] = useState(false);
    const [teacherId, setTeacherId] = useState(null);
    const [teacherName, setTeacherName] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherRole, setTeacherRole] = useState("teacher");

    const handleDelete = (id, name) => {
        setTeacherId(id);
        setTeacherName(name)
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (teacherId) {
            deleteTeacher(teacherId)
                .then(() => {
                    setTeacher(prev => prev.filter(s => s.id !== teacherId));
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

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

    const onEdit = (teacher) => {
        setTeacherId(teacher.id);
        setTeacherName(teacher.name)
        setTeacherEmail(teacher.email)
        setTeacherRole(teacher?.roles[0].name)
        setShowModal(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsWaiting(true);
        try {
            if (!add) {
                await updateTeacher(teacherId, {
                    name: teacherName,
                    email: teacherEmail,
                    ROLE: teacherRole,
                });
                await updateTeacherRole(teacherId, {
                    role: teacherRole,
                });
                setTeacher(prev =>
                    prev.map(exp =>
                      exp.id === teacherId
                        ? {
                            ...exp,
                            name: teacherName,
                            email: teacherEmail,
                            roles: [{ name: teacherRole }],
                          }
                        : exp
                    )
                  );
                  
            } else {
                const { newTeach, message } = await createTeacher({
                    name: teacherName,
                    email: teacherEmail,
                    ROLE: teacherRole
                });
                setTeacher(prev => [...prev, newTeach]);
                setShowMessage(message)
            }
            setTeacherName('');
            setTeacherEmail('');
            setShowModal(false);
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsWaiting(false);
        }
    };

    const formFields = [
        { label: "name", value: teacherName, onChange: (e) => setTeacherName(e.target.value), required: true },
        { label: "email", value: teacherEmail, onChange: (e) => setTeacherEmail(e.target.value), required: true },
        { label: "role", type: "select", value: teacherRole, onChange: (e) => setTeacherRole(e.target.value), options: [{ value: "teacher", label: "teacher" }, { value: "superVisorTeacher", label: "superVisor Teacher" }], required: true },
    ];

    return (
        <div>

            {showDeleteModal && <DeleteModal
                onClose={() => {
                    setShowDeleteModal(false)
                    setTeacherId("")
                    setTeacherName("")
                }}
                onClick={confirmDelete}
                title={`Delete ${teacherName} teacher`}
                message={`do you confirm to delete ${teacherName} teacher`}
            />}

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setTeacherId("")
                    setTeacherName("")
                    setTeacherEmail("")
                    setAdd(false)
                }}
                handleSubmit={handleSubmit}
                isSubmitting={isWaiting}
                error={error}
                modalTitle={add ? "Add teacher" : "Edit teacher"}
                formFields={formFields}
                submitButtonText={isWaiting ? add ? "Adding..." : "Editing..." : add ? "Add teacher" : "Edit"}
                submitButtonVariant="primary"
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
                    columns={["name", "email", "status", "role", "Operation"]}
                    data={teachers}
                    renderRow={(teacher) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={teacher.id}>
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                        <div className="flex items-center justify-center w-full h-full rounded-full bg-purple-600 text-gray-200 font-bold">
                                            {teacher.name?.charAt(0).toUpperCase()}
                                        </div>
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
                                                ${teacher.teacher?.is_active === 0 ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100" :
                                            "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"}
                                        `}>
                                        {teacher.teacher?.is_active === 0 ? authLang[langs[lang]].Inactive : authLang[langs[lang]].Active}
                                    </span>
                                </button>
                            </td>

                            <td className="px-4 py-3 text-sm">
                                {Array.isArray(teacher.roles) ? teacher?.roles[0]?.name : ""}
                                
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
                                                    handleDelete(teacher.id, teacher.name);
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
            {showMessage && <DeleteModal
                onClose={() => setShowMessage("")} onClick={() => setShowMessage("")} message={showMessage} deleteButton="Ok"
            />}

            <FlexButton
                label={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Teachers}
                signal="+"
                onClick={() => {
                    setShowModal(true)
                    setAdd(true)
                }}
            />
        </div>
    );

}
export default TeacherTable;