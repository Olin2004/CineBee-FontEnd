import React from "react";

const CustomSuccessToast = ({ title, message }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <span
      style={{
        background: "#2563eb",
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
      }}
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#2563eb" opacity="0.15" />
        <path
          d="M12 8v4l3 3"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <div>
      <div style={{ fontWeight: 600, color: "#2563eb" }}>{title}</div>
      <div style={{ color: "#222", fontSize: 14 }}>{message}</div>
    </div>
  </div>
);

export default CustomSuccessToast;
