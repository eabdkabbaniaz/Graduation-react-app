import React from "react";

const DataPopup = ({ data, onClose }) => {
  if (!data || !data.user_id) return null;

  const { user_id, session_evaluations, exam_scores } = data;
  const { user, exam_score, assessment_score, attendance_average, final_grade } = user_id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-[30px] text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Student Information</h2>

        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">name:</span> {user.name}</p>
          <p><span className="font-semibold">email:</span> {user.email}</p>
          <p><span className="font-semibold">exam score:</span> {exam_score}</p>
          <p><span className="font-semibold">assessment score:</span> {assessment_score}</p>
          <p><span className="font-semibold">attendance average:</span> {attendance_average}</p>
          <p><span className="font-semibold">final grade:</span> {final_grade}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">session evaluations</h3>
          {session_evaluations.length === 0 ? (
            <p className="text-sm text-gray-500">not exist.</p>
          ) : (
            <ul className="list-disc pr-5 text-right text-sm">
              {session_evaluations.map((evalItem, index) => (
                <li key={index}>{JSON.stringify(evalItem)}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">exam scores</h3>
          {exam_scores.length === 0 ? (
            <p className="text-sm text-gray-500">not exist.</p>
          ) : (
            <ul className="list-disc pr-5 text-right text-sm">
              {exam_scores.map((score, index) => (
                <li key={index}>{JSON.stringify(score)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPopup;
