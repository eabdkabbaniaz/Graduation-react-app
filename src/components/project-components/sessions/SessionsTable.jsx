import { useContext, useEffect, useState } from "react";
import { actions, sessionColumns, universityColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import { deleteSession, editSession, getSession } from "../../../api/session";
import Spinner from "../../ui-components/Spinner";
import CreateAcountModalDynmic from "../../ui-components/CreateAcountModalDynmic";

export default function SessionsTable() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sessionName, setSessionName] = useState();
    const [sessionId, setSessionId] = useState();
    const { lang, setLang } = useContext(LangContext);
    const [sessions, setSessions] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [object, setObject] = useState({ id: "",name: "", drug_ids: [] });
    const [id, setId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await getSession();
                setSessions(data);
            } catch (error) {
                setError("An error occurred while loading the data😥");
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
        setId(obj.id)
        setObject({
            ...object,
            name: obj.name,
            drug_ids: obj.drug?.map((d) => d.id),
        }); 
        setShowModal(true)
    }

    const handleSubmit = async (e, isAdd) => {
        if (isAdd) {
            console.log(isAdd)
        }
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await editSession(id, object);
            setSessions(prev =>
                prev.map(exp =>
                    exp.id === object.id
                        ? { ...exp, object } : exp
                )
            );
            setShowModal(false);
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
            label: "Drugs",
            type: "checkbox-group",
            value: object.drug_ids || '',
            onChange: (value) => {
                const updated = object.drug_ids?.includes(value)
                    ? object.drug_ids.filter((v) => v !== value)
                    : [...(object.drug_ids || []), value];

                setObject({ ...object, drug_ids: updated });
            },
            required: true,
            options: [
                { label: "نور ادرينالين", value: "1" },
                { label: "ادرينالين", value: "2" },
                { label: "استيل كولين", value: "3" },
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

            {showModal && <CreateAcountModalDynmic
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                error={error}
                modalTitle={`Edit Session ${object.name}`}
                formFields={formFields}
                submitButtonText={isSubmitting ? "editing..." : "edit"}
                submitButtonVariant="primary"
            />}

            {isWaiting ? (<Spinner />) : (
                <CustomTable
                    columns={sessionColumns}
                    data={sessions}
                    renderRow={(session) => (
                        <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={session.id}>
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="mr-4">
                                        <p className="font-semibold">{session.name}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3 text-xs">
                                <span
                                    className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                                >
                                    {session.experience_id}
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
                                </div>
                            </td>
                        </tr>
                    )}
                />)}
        </>
    )
}