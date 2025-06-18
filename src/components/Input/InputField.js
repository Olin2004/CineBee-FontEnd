import React, { useState } from "react";
const InputField = ({ icon, value, onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";

  // Custom for input type date: show icon, keep dark background
  if (props.type === "date") {
    return (
      <div style={{ position: "relative", marginBottom: 18 }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            {icon}
          </span>
        )}
        <input
          {...props}
          value={value}
          onChange={onChange}
          style={{
            background: "#2d2552",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: icon ? "12px 16px 12px 44px" : "12px 16px",
            fontSize: 16,
            width: "100%",
            outline: "none",
            position: "relative",
            zIndex: 3,
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", marginBottom: 18 }}>
      {icon && (
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {icon}
        </span>
      )}
      <input
        {...props}
        type={isPassword ? (showPassword ? "text" : "password") : props.type}
        value={value}
        onChange={onChange}
        style={{
          background: "#2d2552",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: icon ? "12px 16px 12px 44px" : "12px 16px",
          fontSize: 16,
          width: "100%",
          outline: "none",
        }}
        autoComplete={isPassword ? "new-password" : undefined}
      />
      {isPassword && (
        <span
          onClick={() => setShowPassword((v) => !v)}
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: showPassword ? "#4ade80" : "#aaa",
            zIndex: 10,
          }}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.09-2.86 3.09-5.18 5.66-6.53M9.53 9.53A3.5 3.5 0 0 1 12 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .47-.09.92-.26 1.33M3 3l18 18"/></svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="6"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </span>
      )}
    </div>
  );
};

export default InputField;
