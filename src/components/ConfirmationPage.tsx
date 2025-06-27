import React from 'react';
import TikiTakyHeader from './TikiTakyHeader';
import './ConfirmationPage.css';

interface ConfirmationPageProps {
  onRestartDemo: () => void;
}

/**
 * ConfirmationPage component for successful booking confirmation
 * Shows booking confirmation and restart option
 */
export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  onRestartDemo,
}) => {
  return (
    <div className="tikitaky-demo-page">
      <TikiTakyHeader />
      <div className="tikitaky-confirmation-state">
        <div className="tikitaky-container">
          <div className="tikitaky-confirmation-content">
            <div className="tikitaky-confirmation-icon">✅</div>
            <h1>Booking confirmed!</h1>
            <p>Your booking has been successfully confirmed.</p>
            <button
              className="tikitaky-button tikitaky-button--primary"
              onClick={onRestartDemo}
            >
              Try Another Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;