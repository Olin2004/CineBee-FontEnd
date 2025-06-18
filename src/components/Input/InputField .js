import React from "react";

const InputField = ({ icon, value, onChange, ...props }) => {
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
        autoComplete={props.type === "password" ? "new-password" : undefined}
      />
    </div>
  );
};

export default InputField;
