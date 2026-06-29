import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[80px] h-[80px] border-4 border-t-[#3bc173] border-r-transparent border-b-[#3bc173] border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
