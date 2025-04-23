
const ReusableTable = ({ columns, data, renderRow }) => {
    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <table className="w-full whitespace-no-wrap text-base">
                <thead>
                    <tr className="font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`px-4 py-3 ${col === "الاجراء" ? "text-center" : "text-start"}`}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {data.map((item, idx) => renderRow(item, idx))}
                </tbody>
            </table>
        </div>
    );
};
export default ReusableTable;
