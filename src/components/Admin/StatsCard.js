import React from 'react';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  trendValue,
  description,
  className = '',
}) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      light: 'from-blue-50 to-blue-100',
      text: 'text-blue-600',
      icon: 'text-blue-500',
    },
    green: {
      bg: 'from-green-500 to-green-600',
      light: 'from-green-50 to-green-100',
      text: 'text-green-600',
      icon: 'text-green-500',
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      light: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      icon: 'text-purple-500',
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      light: 'from-orange-50 to-orange-100',
      text: 'text-orange-600',
      icon: 'text-orange-500',
    },
    red: {
      bg: 'from-red-500 to-red-600',
      light: 'from-red-50 to-red-100',
      text: 'text-red-600',
      icon: 'text-red-500',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.light} opacity-50`}></div>

      {/* Main Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
              {trend && (
                <span
                  className={`text-sm font-medium ${
                    trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend === 'up' ? '↗' : '↘'} {trendValue}
                </span>
              )}
            </div>
            {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
          </div>

          {/* Icon */}
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg} shadow-lg transform hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className={`h-1 bg-gradient-to-r ${colors.bg}`}></div>
    </div>
  );
};

export default StatsCard;
