import React from 'react';
// spinner من اجل تحميل البيانات 
const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
