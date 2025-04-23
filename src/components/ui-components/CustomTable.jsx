import { accounts } from "../../store/Data";

export default function CustomTable() {
    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr
                            className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                        >
                            <th className="px-4 py-3">Universities</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Register Date</th>
                            <th className="px-4 py-3">Operation</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {accounts.map((account) => (
                            <tr className="text-gray-700 dark:text-gray-400" key={account.id}>
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
                                        <div>
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
                                    $ 863.45
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}