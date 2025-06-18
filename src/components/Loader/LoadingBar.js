import React from "react";

const LoadingBar = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#23213a] z-50">
      <div className="relative w-40 h-2">
        <div className="absolute left-0 top-0 w-full h-full bg-transparent rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-green-400 rounded-full animate-loading-bar"></div>
        </div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(0); }
          100% { transform: translateX(200%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;
