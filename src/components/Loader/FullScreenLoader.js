const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px), radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>
    </div>

    {/* Loading content */}
    <div className="relative z-10 flex flex-col items-center">
      {/* Logo or brand */}
      <div className="mb-8 animate-pulse">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-2xl font-bold text-white">C</span>
        </div>
      </div>

      {/* Enhanced loading bar */}
      <div className="relative w-64 h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-gray-300 dark:border-white/20">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-full animate-loader-bar shadow-lg"
          style={{ width: '40%' }}
        />
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>

      {/* Loading text */}
      <div className="mt-6 text-gray-700 dark:text-white/80 font-medium animate-pulse">
        Loading amazing content...
      </div>
    </div>

    {/* CSS animations */}
    <style>
      {`
        @keyframes loader-bar {
          0% { left: 0; width: 40%; }
          50% { left: 30%; width: 60%; }
          100% { left: 100%; width: 40%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loader-bar {
          animation: loader-bar 1.2s infinite cubic-bezier(.4,0,.2,1);
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}
    </style>
  </div>
);

export default FullScreenLoader;
