import React, { useState, useEffect, useRef } from 'react';
import { loadPrimer, PrimerCheckoutComponent, type InitializedPaymentMethod } from '@primer-io/primer-js';
import { fetchClientToken } from './fetchClientToken';
import { mockListing, mockBooking } from './config';
import LoadingState from './components/LoadingState';
import TikiTakyHeader from './components/TikiTakyHeader';
import BookingSummary from './components/BookingSummary';
import Accordion from './components/Accordion';
import ProcessingOverlay from './components/ProcessingState';
import ConfirmationPage from './components/ConfirmationPage';
import './base.css';
import './App.css';

/**
 * TikiTaky Checkout Demo - Single File Application
 * 
 * This demo follows the Golden Demo Loop:
 * 1. Fake Loader (1-2 seconds)
 * 2. Checkout Page Display (booking summary + payment)
 * 3. Payment Interaction (Primer SDK integration)
 * 4. "Redirecting, please wait" State
 * 5. Confirmation Page
 * 6. Back/Restart Button → Loop to Step 1
 */

type DemoStep = 'loading' | 'checkout' | 'confirmation';

export function App() {
  // Demo flow state management
  const [currentStep, setCurrentStep] = useState<DemoStep>('loading');
  const [clientToken, setClientToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment method states
  const [otherMethods, setOtherMethods] = useState<InitializedPaymentMethod[]>([]);
  const [payPalMethod, setPayPalMethod] = useState<InitializedPaymentMethod | null>(null);
  const [klarnaMethod, setKlarnaMethod] = useState<InitializedPaymentMethod | null>(null);
  
  // Primer SDK ref
  const checkoutRef = useRef<PrimerCheckoutComponent>(null);

  // Initialize checkout when component mounts
  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        await loadPrimer();
        const response = await fetchClientToken('a1b2c3d4e5f6g7h8i9j0', 'klarna');
        
        if (response.success && response.clientToken) {
          setClientToken(response.clientToken);
        } else {
          setError('Failed to initialize payment system');
        }
      } catch (err) {
        console.error('Error initializing checkout:', err);
        setError('Error initializing checkout system');
      }
    };

    if (currentStep === 'checkout') {
      initializeCheckout();
    }
  }, [currentStep]);

  // Set up Primer SDK event listeners
  useEffect(() => {
    if (!clientToken || !checkoutRef.current) return;

    const checkoutElement = checkoutRef.current;

    // Add event listener for payment methods updates
    checkoutElement.addEventListener('primer:methods-update', (event) => {
      const paymentMethods = event.detail;
      const methods = paymentMethods.toArray();

      // Extract PayPal and Klarna specifically for express checkout
      const payPal = paymentMethods.get('PAYPAL');
      const klarna = paymentMethods.get('KLARNA');

      // Set state for these express payment methods
      if (payPal) setPayPalMethod(payPal);
      if (klarna) setKlarnaMethod(klarna);

      // Filter out card payments, PayPal, and Klarna from other methods
      const filteredMethods = methods.filter(
        (method) =>
          method.type !== 'PAYMENT_CARD' &&
          method.type !== 'PAYPAL' &&
          method.type !== 'KLARNA',
      );

      setOtherMethods(filteredMethods);
    });

    // Add event listener for payment state change
    checkoutElement.addEventListener('primer:state-change', (evt) => {
      // Check if payment was successful
      if (evt.detail?.isSuccessful) {
        setIsProcessing(false);
        setTimeout(() => {
          setCurrentStep('confirmation');
        }, 1500);
      } else if (evt.detail?.isProcessing) {
        setIsProcessing(true);
      } else if (evt.detail?.error) {
        setError('Payment failed. Please try again.');
        setIsProcessing(false);
      }
    });
  }, [clientToken, loading, showLoader]);

  // Handle loading completion (Step 1 → Step 2)
  const handleLoadingComplete = () => {
    setCurrentStep('checkout');
  };

  // Handle restart demo (Step 6 → Step 1)
  const handleRestartDemo = () => {
    setCurrentStep('loading');
    setClientToken(null);
    setError(null);
    setIsProcessing(false);
  };

  // Render based on current demo step
  if (currentStep === 'loading') {
    return (
      <LoadingState 
        onLoadingComplete={handleLoadingComplete}
        minLoadingTime={2000}
      />
    );
  }


  if (currentStep === 'confirmation') {
    return (
      <ConfirmationPage
        onRestartDemo={handleRestartDemo}
      />
    );
  }

  // Main checkout page (Step 2)
  return (
    <div className="tikitaky-demo-page">
      {/* Processing overlay - shown over the checkout without unmounting */}
      <ProcessingOverlay isVisible={isProcessing} />
      <TikiTakyHeader />
      <div className="tikitaky-checkout-container">
        <div className="tikitaky-container">
          <div className="tikitaky-checkout-content">
            <div className="tikitaky-checkout-main">
              <h1>Confirm and pay</h1>
              
              {error && (
                <div className="tikitaky-error-message">
                  <p>{error}</p>
                </div>
              )}

              {clientToken ? (
                <div className="tikitaky-payment-section">
                  <primer-checkout 
                    client-token={clientToken}
                    class="primer-light-theme"
                    ref={checkoutRef}
                  >
                    <primer-main slot="main">
                      <div slot="payments" className="tikitaky-payment-methods">
                        {/* Express Checkout Section */}
                        {(payPalMethod || klarnaMethod) && (
                          <div className="tikitaky-express-checkout-section">
                            <h3 className="tikitaky-express-checkout-title">Express Checkout</h3>
                            <div className="tikitaky-express-checkout-methods">
                              {payPalMethod && (
                                <primer-payment-method
                                  type={payPalMethod.type}
                                ></primer-payment-method>
                              )}
                              {klarnaMethod && (
                                <primer-payment-method
                                  type={klarnaMethod.type}
                                ></primer-payment-method>
                              )}
                            </div>
                            <div className="tikitaky-express-checkout-divider">
                              <span>or pay with card</span>
                            </div>
                          </div>
                        )}

                        {/* Enhanced Card Form */}
                        <primer-card-form>
                          <div slot="card-form-content" className="tikitaky-card-form">
                            <primer-input-card-holder-name
                              label="Cardholder Name"
                              placeholder="Name on your card"
                              aria-label="Full name as it appears on your credit or debit card"
                            ></primer-input-card-holder-name>
                            <div className="tikitaky-card-form-row">
                              <div className="tikitaky-card-number-wrapper">
                                <primer-input-card-number
                                  label="Card Number"
                                  placeholder="1234 5678 9012 3456"
                                  aria-label="Enter your credit or debit card number"
                                ></primer-input-card-number>
                              </div>
                              <div className="tikitaky-expiry-wrapper">
                                <primer-input-card-expiry
                                  label="Expiry"
                                  placeholder="MM/YY"
                                  aria-label="Card expiration date"
                                ></primer-input-card-expiry>
                              </div>
                              <div className="tikitaky-cvv-wrapper">
                                <primer-input-cvv
                                  label="CVV"
                                  placeholder="•••"
                                  aria-label="Card security code (CVV)"
                                ></primer-input-cvv>
                              </div>
                            </div>
                            <primer-card-form-submit>
                              Confirm and pay
                            </primer-card-form-submit>
                          </div>
                        </primer-card-form>

                        {/* Other Payment Methods in Accordion */}
                        {otherMethods.length > 0 && (
                          <Accordion title="Other ways to pay">
                            <div className="tikitaky-other-payment-methods">
                              {otherMethods.map((method) => (
                                <primer-payment-method
                                  key={method.type}
                                  type={method.type}
                                ></primer-payment-method>
                              ))}
                            </div>
                          </Accordion>
                        )}
                        
                        <primer-error-message-container></primer-error-message-container>
                      </div>
                    </primer-main>
                  </primer-checkout>
                </div>
              ) : (
                <div className="tikitaky-loading-payment">
                  <div className="tikitaky-spinner"></div>
                  <p>Loading payment options...</p>
                </div>
              )}
            </div>

            <div className="tikitaky-checkout-sidebar">
              <BookingSummary listing={mockListing} booking={mockBooking} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;