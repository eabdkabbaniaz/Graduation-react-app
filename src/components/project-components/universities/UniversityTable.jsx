import { useContext, useState } from "react";
import { accounts, actions, universityColumns } from "../../../store/Data";
import CustomTable from "../../ui-components/CustomTable";
import DeleteModal from "../../ui-components/DeleteModal";
import LangContext from "../../../context/LangContext";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";

export default function UniversityTable() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {lang, setLang} = useContext(LangContext);

    return (
        <>
            {showDeleteModal && <DeleteModal
                onClose={() => setShowDeleteModal(false)} 
                title={authLang[langs[lang]].deleteUniversity}
                message={authLang[langs[lang]].targetNameDel('"name"',authLang[langs[lang]].University)}
                />}
            <CustomTable
                columns={universityColumns}
                data={accounts}
                renderRow={(account) => (
                    <tr dir={lang === "ar" ? "rtl" : ""} className="text-gray-700 dark:text-gray-400" key={account.id}>
                        <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                                {/* <!-- Avatar with inset shadow --> */}
                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img
                                        className="object-cover w-full h-full rounded-full"
                                        src={account.img}
                                        alt=""
                                        loading="lazy"
                                    />
                                    <div
                                        className="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"
                                    ></div>
                                </div>
                                <div className="mr-4">
                                    <p className="font-semibold">{account.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {account.location}
                                    </p>
                                </div>
                            </div>
                        </td>

                        <td className="px-4 py-3 text-xs">
                            <span
                                className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                            >
                                {account.status}
                            </span>
                        </td>

                        <td className="px-4 py-3 text-sm">
                            {account.date}
                        </td>

                        <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-4 text-sm">
                                {actions.map((a => (
                                    <button
                                        key={a.id}
                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray cursor-pointer"
                                        aria-label={a.label}
                                        onClick={() => setShowDeleteModal(true)}
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
        </>
    )
}