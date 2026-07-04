import React from 'react';

const StatCard = (props) => {
  const { title, value, icon, color = 'primary', subtitle } = props;

  const bgClass = `bg-${color} bg-opacity-10`;
  const borderClass = `border-${color}`;
  const textClass = `text-${color}`;

  return (
    <div className={` ${`${bgClass} ${borderClass} h-100 shadow-sm`}`.trim()}
      
      style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.classList.add('shadow');
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.classList.remove('shadow');
      }}
    >
      <div className="card-body d-flex align-items-start justify-content-between p-4" >
        {/* Left side: Text and numbers */}
        <div>
          <h6 className="card-subtitle mb-2 text-muted fw-medium" >
            {title}
          </h6>
          <h5 className={` ${`fs-2 fw-bolder ${textClass}`}`.trim()} >
            {value}
          </h5>
          
          {/* Only show subtitle if it exists */}
          {subtitle && (
            <p className="card-text text-muted small mt-1" >
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Right side: Icon */}
        {icon && (
          <div className={` ${`${textClass} bg-${color} bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center`}`.trim()}
            
            style={{ width: '52px', height: '52px' }}
          >
            {/* If icon is a string, it's a bootstrap icon class, else it might be a component */}
            {typeof icon === 'string' ? (
              <i className={` ${`bi ${icon} fs-4`}`.trim()} ></i>
            ) : (
              <span className="fs-4" >{React.createElement(icon)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(StatCard);
