/**
 * Mock configuration data for TikiTaky demo
 * In a real application, this data would come from API calls or props
 */

export interface Listing {
  title: string;
  location: string;
  imageUrl: string;
  host: string;
  rating: number;
  reviewCount: number;
}

export interface Booking {
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  totalPrice: number;
}

export const mockListing: Listing = {
  title: 'Luxury TikiTaky Experience in Paradise',
  location: 'Bali, Indonesia',
  imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  host: 'Travel Expert',
  rating: 4.9,
  reviewCount: 156,
};

export const mockBooking: Booking = {
  checkIn: 'Dec 25',
  checkOut: 'Dec 30',
  guests: 2,
  nights: 5,
  pricePerNight: 199,
  cleaningFee: 45,
  serviceFee: 28,
  totalPrice: 1068,
};