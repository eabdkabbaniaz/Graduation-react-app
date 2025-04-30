export default function CustomCard({icon,name,number,className}) {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div className={className}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d={icon}></path>
                            </svg>
                        </div>
                        <div className="mr-4">
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                {name}
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                {number}
                            </p>
                        </div>
                    </div>
    )
}