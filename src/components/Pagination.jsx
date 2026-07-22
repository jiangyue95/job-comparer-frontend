function Pagination({ data, onPageChange }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm">
            <span className="text-gray-500">
                Page {data.number + 1} of {data.totalPages} · {data.totalElements} records
            </span>

            <div className="flex gap-2">
                <button
                    onClick={() => onPageChange(data.number - 1)}
                    disabled={data.first}
                    className="px-3 py-1 rounded-md border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(data.number + 1)}
                    disabled={data.last}
                    className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination