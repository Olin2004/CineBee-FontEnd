import React from 'react';

const ActionButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
    secondary:
      'bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow-md',
    success:
      'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl',
    danger:
      'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl',
    warning:
      'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden inline-flex items-center justify-center gap-2 
        font-medium rounded-xl transition-all duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Content */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && <Icon className="text-current" />}
        {children}
      </div>
    </button>
  );
};

export default ActionButton;
