import { useContext, useEffect, useState } from "react";
import { actions, sessionColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { addSession, deleteSession, editSession, getSession } from "../../../api/session";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";
import { useNavigate } from "react-router-dom";
import Button from "../../ui-components/Button";
import CategoryFilter from "../../ui-components/CategoryFilter";
import { fetchExperinence } from "../../../api/experinence";

export default function SessionsTable({ setSessionNameQR, setCode, setShowSession, setShowSessionName, setShowSessionId }) {

    const role = localStorage.getItem("role");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sessionName, setSessionName] = useState();
    const [sessionId, setSessionId] = useState();
    const { lang, setLang } = useContext(LangContext);
    const [sessions, setSessions] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [object, setObject] = useState({ name: "", drug_ids: [], experience_id: 1, status: 0, mark: 0 });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [add, setAdd] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState("عرض عينة"); // 
    const [filteredSessions, setFilteredSessions] = useState([]);

    useEffect(() => {
        setFilteredSessions(sessions); 
    }, [sessions]);

    const handleFilter = async (experienceId) => {
        setSelectedCategoryId(experienceId);
      
        if (experienceId === "عرض عينة") {
        const sessionsData = await getSession(1);
          setFilteredSessions(sessionsData.flat());
        } else {
          const filtered = await getSession(experienceId);
          setFilteredSessions(filtered);
        }
      };
      
    const navigate = useNavigate();

    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getSession(1);
                const dataExp = await fetchExperinence();
                setExperiences(dataExp);
                setSessions(data);
            } catch (error) {
                setError("An error occurred while loading the data");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, [isSubmitting === false]);

    const handleDelete = (id, name) => {
        setSessionName(name);
        setSessionId(id);
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (sessionId) {
            deleteSession(sessionId)
                .then(() => {
                    setSessions(prev => prev.filter(s => s.id !== sessionId));
                    setTimeout(() => { }, 3000);
                    setShowDeleteModal(false);
                })
                .catch(err => {
                    console.log("حدث خطأ:", err);
                });
        }
    };

    const onEdit = (obj) => {
        console.log(obj)
        setSessionId(obj.id)
        setObject({
            name: obj.name,
            drug_ids: obj.drugs?.map((d) => String(d.id)),
            status: obj.status,
            mark: obj.mark,
        });
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        console.log(object)
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isAdd) {
                await addSession(object);
            } else {
                await editSession(sessionId, object);
            }
            setShowModal(false);
            setObject({
                name: "",
                drug_ids: [],
                experience_id: 1,
                status: 0,
                mark: 0
            })
            setError("")
            setAdd("")
        } catch (err) {
            setError(" An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        {
            label: "name",
            value: object.name,
            onChange: (e) => setObject({ ...object, name: e.target.value }),
            required: true,
        },
        {
            label: "status",
            value: object.status,
            type: "select",
            onChange: (e) => setObject({ ...object, status: e.target.value }),
            options: [
                { label: "active", value: 1 },
                { label: "Inactive", value: 0 },
            ],
            required: true,
        },
        {
            label: "mark",
            value: object.mark,
            onChange: (e) => setObject({ ...object, mark: e.target.value }),
            type: "number",
            min: 0,
            required: true,
        },
        {
            label: "experince",
            value: object.experience_id,
            type: "select",
            onChange: (e) => setObject({ ...object, experience_id: e.target.value }),
            options: experiences.map((expr) => ({
                label: expr.name,
                value: expr.id
            })),
            required: true,
        },
        {
            label: "Drugs",
            type: "checkbox-group",
            value: object.drug_ids || '',
            onChange: (value) => {
                const updated = object.drug_ids?.includes(value)
                    ? object.drug_ids.filter((v) => v !== value)
                    : [...(object.drug_ids || []), String(value)];

                setObject({ ...object, drug_ids: updated });
            },
            required: true,
            options: [
                { label: "Acetylcholine", value: "1" },
                { label: "Adrenaline (Epinephrine)", value: "2" },
                { label: "Atropine", value: "3" },
                { label: "Noradrenaline (Norepinephrine)", value: "4" },
                { label: "Alpha Beta Blocker", value: "5" },
                { label: "Magnisum", value: "6" },
                { label: "Carbachol", value: "7" },
                { label: "Prazosin", value: "8" },
                { label: "Barium", value: "9" },
            ],
        },
    ];

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)}
                onClick={confirmDelete}
                title="Delete Session"
                message={`do you confirm to delete Session ${sessionName}`}
            />}

            <CategoryFilter
                categories={experiences}
                handleFilter={handleFilter}
                selectedCategoryId={selectedCategoryId}
                intialValue="عرض عينة"
            />

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setObject({
                        name: "",
                        drug_ids: [],
                        experience_id: 1,
                        status: 0,
                        mark: 0
                    })
                    setError("")
                    setAdd(false)
                }}
                handleSubmit={add ? (e) => handleSubmit(e, true) : (e) => handleSubmit(e, false)}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={add ? "Add Session" : `Edit Session`}
                formFields={formFields}
                submitButtonText={isSubmitting ? add ? "Adding..." : "Editing..." : add ? "Add" : "Edit"}
            />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={sessionColumns}
                    data={filteredSessions}
                    renderRow={(session) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={session.id}>

                            <td className="px-4 py-3 cursor-pointer" onClick={() => {
                                (role !== "manger" && setShowSession(true))
                                setShowSessionName(session.name)
                                setShowSessionId(session.id)
                            }}>
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{session.name}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight">
                                    {session.experience_id.name}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight">
                                    {session.teacher_id.name}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-sm">
                                <select className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                    {Array.isArray(session.drugs) && session.drugs.length > 0 ? (
                                        session.drugs.map((drug, index) => (
                                            <option key={index} value={drug.name}>
                                                {drug.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>لا توجد أدوية</option>
                                    )}
                                </select>
                            </td>

                            <td className="px-4 py-3 text-xs">
                                <span className={`px-2 py-1 font-semibold leading-tight ${session.status === 1 ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100" : "text-red-700 bg-red-100 dark:bg-res-700 dark:text-red-100"}  rounded-full`}>
                                    {session.status === 1 ? "Active" : "Inactive"}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight">
                                    {session.mark}
                                </span>
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
                                                    handleDelete(session.id, session.name);
                                                } else if (a.label === "Edit") onEdit?.(session);
                                            }}                                    >
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path d={a.d} fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    )))}

                                    <button
                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray cursor-pointer"
                                        onClick={() => {
                                            setSessionNameQR(session.name)
                                            setCode(session.code)
                                            navigate("/qr")
                                        }}
                                    >
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                />)}
            <div className="flex justify-end">
                <div className="fixed bottom-4 right-6 mt-4">
                    <Button
                        name={authLang[langs[lang]].Add + " " + authLang[langs[lang]].Sessions}
                        signal="+"
                        onClick={() => {
                            setShowModal(true)
                            setAdd(true)
                        }}
                    />
                </div>
            </div>

        </>
    )
}