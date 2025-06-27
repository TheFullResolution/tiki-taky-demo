import React, { useState } from 'react';
import './Accordion.css';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Accordion component for collapsible content sections
 * Used for "Other ways to pay" section
 */
export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='tikitaky-accordion'>
      <button
        className='tikitaky-accordion-trigger'
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls='accordion-content'
      >
        <span className='tikitaky-accordion-title'>{title}</span>
        <span className={`tikitaky-accordion-icon ${isOpen ? 'open' : ''}`}>
          ▼
        </span>
      </button>

      <div
        id='accordion-content'
        className={`tikitaky-accordion-content ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className='tikitaky-accordion-content-inner'>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
