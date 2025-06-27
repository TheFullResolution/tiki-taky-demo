import React, { useEffect } from 'react';
import './LoadingState.css';

interface LoadingStateProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
}

/**
 * TikiTaky-styled loading state component
 * Simulates page loading before checkout display
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  onLoadingComplete,
  minLoadingTime = 2000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [onLoadingComplete, minLoadingTime]);

  return (
    <div className="tikitaky-loading-state">
      <div className="tikitaky-loading-container">
        <div className="tikitaky-loading-logo">
          <div className="tikitaky-logo-placeholder">tikitaky</div>
        </div>
        <div className="tikitaky-loading-spinner">
          <div className="tikitaky-spinner"></div>
        </div>
        <p className="tikitaky-loading-text">Preparing your booking...</p>
      </div>
    </div>
  );
};

export default LoadingState;