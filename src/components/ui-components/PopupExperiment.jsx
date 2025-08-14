import React from "react";

export default function PopupExperiment({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center relative dark:bg-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 dark:text-gray-100">اختر التجربة</h2>

        <div className="flex flex-col gap-4 dark:text-gray-100">
          <a
            href="/simulation/forg/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 dark:text-white rounded-lg hover:bg-green-700 transition"
          >
             تجربة قلب الضفدع
          </a>

          <a
            href="simulation/rabbit/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 dark:text-white rounded-lg hover:bg-blue-700 transition"
          >
             تجربة معي الأرنب
          </a>
        </div>

        <button
          onClick={onClose}
          className="absolute top-[20px] right-[40px] text-gray-400 hover:text-red-500 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
