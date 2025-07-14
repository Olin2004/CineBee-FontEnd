import React from 'react';
import ActionButton from './ActionButton';

const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  breadcrumbs = [],
  actions = [],
  stats = [],
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200/50 mb-8 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>

      <div className="relative p-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-slate-400">/</span>}
                  <span
                    className={`${
                      index === breadcrumbs.length - 1
                        ? 'text-slate-900 font-medium'
                        : 'text-slate-500 hover:text-slate-700 cursor-pointer'
                    }`}
                  >
                    {crumb}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center space-x-4 mb-2">
              {Icon && (
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Icon className="text-white text-2xl" />
                </div>
              )}
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && <p className="text-slate-600 mt-2 text-lg">{subtitle}</p>}
              </div>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="flex items-center space-x-6 mt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <span className="text-sm text-slate-600">{stat.label}:</span>
                    <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex items-center space-x-3">
              {actions.map((action, index) => (
                <ActionButton
                  key={index}
                  variant={action.variant || 'primary'}
                  icon={action.icon}
                  onClick={action.onClick}
                  {...action.props}
                >
                  {action.label}
                </ActionButton>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
    </div>
  );
};

export default PageHeader;
