import React from "react";

// Reusable card to display dashboard statistics
const StatCard = (props) => {
  const { title, value, icon, color = "primary", subtitle } = props;

  // Generate Bootstrap classes based on the selected color
  const bgClass = `bg-${color} bg-opacity-10`;
  const borderClass = `border-${color}`;
  const textClass = `text-${color}`;

  return (
    <div
      className={`${`${bgClass} ${borderClass} h-100 shadow-sm`}`.trim()}
      style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
      // Add a small hover effect
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.classList.add("shadow");
      }}
      // Reset the card when the mouse leaves
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.classList.remove("shadow");
      }}
    >
      <div className="card-body d-flex align-items-start justify-content-between p-4">
        {/* Card title and value */}
        <div>
          <h6 className="card-subtitle mb-2 text-muted fw-medium">{title}</h6>

          <h5 className={`${`fs-2 fw-bolder ${textClass}`}`.trim()}>{value}</h5>

          {/* Show subtitle only if it is provided */}
          {subtitle && (
            <p className="card-text text-muted small mt-1">{subtitle}</p>
          )}
        </div>

        {/* Display the icon on the right */}
        {icon && (
          <div
            className={`${`${textClass} bg-${color} bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center`}`.trim()}
            style={{ width: "52px", height: "52px" }}
          >
            {/* Render either a Bootstrap icon or a React icon component */}
            {typeof icon === "string" ? (
              <i className={`${`bi ${icon} fs-4`}`.trim()}></i>
            ) : (
              <span className="fs-4">{React.createElement(icon)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Prevent unnecessary re-renders when props stay the same
export default React.memo(StatCard);
