const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181736]">
    <div className="w-40 h-2 rounded-full bg-[#2d295c] relative overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-green-400 rounded-full animate-loader-bar"
        style={{ width: '40%' }}
      />
    </div>
    {/* CSS animation: animate-loader-bar */}
    <style>
      {`
        @keyframes loader-bar {
          0% { left: 0; width: 40%; }
          50% { left: 30%; width: 60%; }
          100% { left: 100%; width: 40%; }
        }
        .animate-loader-bar {
          animation: loader-bar 0.6s infinite cubic-bezier(.4,0,.2,1);
        }
      `}
    </style>
  </div>
);
export default FullScreenLoader;
