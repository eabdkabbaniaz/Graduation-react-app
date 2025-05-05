import Spinner from "../../ui-components/Spinner";
import CustomTable from "../../ui-components/CustomTable";
import { actions, experinenceColumns } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";
import { useContext } from "react";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
const ExperinenceTable = ({ data, onEdit, isWaiting, error
    , toggleStatus, confirmDelete, showDeleteModal, setShowDeleteModal, handleDelete
}) => {

    const { lang, setLang } = useContext(LangContext)

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">

                {showDeleteModal && <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    onClick={confirmDelete}
                    title={`${authLang[langs[lang]].Delete}  ${authLang[langs[lang]].Experinence}`}
                    message={authLang[langs[lang]].targetNameDel("'name'", authLang[langs[lang]].Experinence)}
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
                        columns={experinenceColumns}
                        data={data}
                        renderRow={(experinence) => (
                            <tr className="text-gray-700 dark:text-gray-400" key={experinence.id}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center text-sm">
                                        <div>
                                            <p className="font-semibold">{experinence.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {experinence.before_instruction}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {experinence.after_instruction}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <button onClick={() => toggleStatus(experinence.id)}>
                                        <span className={`px-2 py-1 text-[12px] font-semibold leading-tight rounded-full 
                                                ${experinence.status === 0 ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100" : 
                                                    "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"}
                                        `}>
                                            {experinence.status === 0 ? authLang[langs[lang]].Inactive : authLang[langs[lang]].Active}
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
                                                        handleDelete(experinence.id);
                                                    } else if (a.label === "Edit") onEdit?.(experinence);
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
        </div>
    )
}
export default ExperinenceTable;