import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="loader border-t-4 border-white rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default FullPageLoader;
