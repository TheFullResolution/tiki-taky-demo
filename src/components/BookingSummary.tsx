import React from 'react';
import type { Listing, Booking } from '../config';
import './BookingSummary.css';

interface BookingSummaryProps {
  listing: Listing;
  booking: Booking;
}

/**
 * TikiTaky booking summary component
 */
export const BookingSummary: React.FC<BookingSummaryProps> = ({ listing, booking }) => {
  return (
    <div className="tikitaky-booking-summary">
      <div className="tikitaky-listing-info">
        <img src={listing.imageUrl} alt={listing.title} className="tikitaky-listing-image" />
        <h3>{listing.title}</h3>
        <p>{listing.location}</p>
        <div className="tikitaky-rating">
          <span>★ {listing.rating}</span>
          <span>({listing.reviewCount} reviews)</span>
        </div>
      </div>
      <div className="tikitaky-booking-details">
        <h4>Your booking</h4>
        <p>{booking.checkIn} – {booking.checkOut}</p>
        <p>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
        <div className="tikitaky-price-breakdown">
          <div>${booking.pricePerNight} x {booking.nights} nights: ${booking.pricePerNight * booking.nights}</div>
          <div>Cleaning fee: ${booking.cleaningFee}</div>
          <div>Service fee: ${booking.serviceFee}</div>
          <div className="tikitaky-total">Total: ${booking.totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;