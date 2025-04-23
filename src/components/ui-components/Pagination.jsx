import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-center">
      <button
        aria-label="الانتقال للصفحة السابقة"
        className={`px-4 py-2 mx-2 ${currentPage === 1 ? "bg-gray-300" : "bg-purple-500"} text-white rounded`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          aria-label={`الانتقال للصفحة رقم ${index + 1}`}
          aria-current={currentPage === index + 1 ? "page" : undefined}
          className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? "bg-purple-600" : "bg-purple-400"} text-white rounded`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        aria-label="الانتقال للصفحة التالية"
        className={`px-4 py-2 mx-2 ${currentPage === totalPages ? "bg-gray-300" : "bg-purple-500"} text-white rounded`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
