import React from "react";

const FullPageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white opacity-70 z-50 flex justify-center items-center">
      <div className="loader border-t-3 border-black rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default FullPageLoader;
