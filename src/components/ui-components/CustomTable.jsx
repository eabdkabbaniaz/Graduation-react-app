export default function CustomTable({ columns, data, renderRow }) {
    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-4 py-3`}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {data !== undefined ? data.map((item, idx) => renderRow(item, idx)) : ""}
                    </tbody>
                </table>
            </div>
        </div>
    )
}