import React from 'react';
import './ProcessingState.css';

interface ProcessingOverlayProps {
  isVisible: boolean;
}

/**
 * ProcessingOverlay component - shows overlay during payment processing
 * Dims the checkout components instead of unmounting them
 * This ensures payment flow continues uninterrupted
 */
export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  isVisible,
}) => {
  if (!isVisible) return null;
  return (
    <div className='tikitaky-processing-overlay'>
      <div className='tikitaky-processing-content'>
        <div className='tikitaky-processing-spinner'>
          <div className='tikitaky-spinner'></div>
        </div>
        <h2>Processing your payment...</h2>
        <p>Please wait while we securely process your booking.</p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
