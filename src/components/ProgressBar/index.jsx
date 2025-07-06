import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  value, 
  max = 100, 
  label = '', 
  showPercentage = true, 
  color = 'primary',
  height = 8,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={`progress-bar-container ${className}`}>
      <div className="progress-bar-labels">
        {label && <span className="progress-bar-label">{label}</span>}
        {showPercentage && (
          <span className="progress-bar-percentage">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div 
        className="progress-bar-track"
        style={{
          '--progress-height': `${height}px`,
          '--progress-radius': `${Math.min(4, height / 2)}px`
        }}
      >
        <div 
          className={`progress-bar-fill progress-${color}`}
          style={{
            width: `${percentage}%`,
            '--progress-height': `${height}px`,
            '--progress-radius': `${Math.min(4, height / 2)}px`
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
