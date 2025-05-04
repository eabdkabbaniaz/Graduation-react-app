import Spinner from "../../ui-components/Spinner";
import CustomTable from "../../ui-components/CustomTable";
import { actions } from "../../../store/Data";
import DeleteModal from "../../ui-components/DeleteModal";
const ExperinenceTable = ({ data, onEdit, setData, reloadData, isWaiting, error
    , toggleStatus, confirmDelete, showDeleteModal, setShowDeleteModal, handleDelete
}) => {

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">

                {showDeleteModal && <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    onClick={confirmDelete}
                    title="Delete Experinence"
                    message="do you confirm to delete Experinence"

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
                        columns={["name", "before_instruction", "after_instruction", "status", "Operation"]}
                        data={data}
                        renderRow={(experinence) => (
                            <tr className="text-gray-700 dark:text-gray-400" key={experinence.id}>
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
                                    <button
                                        onClick={() => toggleStatus(experinence.id)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold 
                               ${experinence.status === 0
                                                ? "bg-gray-200 text-gray-800"
                                                : "bg-green-200 text-green-800"
                                            }`}
                                    >
                                        {experinence.status === 0 ? "Inactive" : "Active"}
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