// src/services/emailjs.ts

import emailjs from '@emailjs/browser';

// ============================================================
// EMAILJS CONFIGURATION
// ============================================================

const SERVICE_ID: string = 'service_7cip69c';
const CUSTOMER_TEMPLATE_ID: string = 'template_tpo3c0r';
const PUBLIC_KEY: string = 'p2EZpBYIFBQnH1LWI';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// ============================================================
// TYPES
// ============================================================

export interface BookingData {

  // Customer Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Travel Details
  travelDate: string;
  travelers: number;
  specialRequests?: string;

  // Package Details
  packageName: string;
  duration?: string;

  // Pricing
  packagePrice: number;
  totalAmount: number;

  // Booking
  bookingRef: string;
}

// ============================================================
// SEND BOOKING EMAIL
// ============================================================

export async function sendBookingEmails(
  booking: BookingData
): Promise<{ success: boolean; message: string }> {

  try {

    // ============================================================
    // VALIDATION
    // ============================================================

    if (
      !booking.email ||
      !booking.firstName ||
      !booking.packageName
    ) {

      throw new Error('Missing required booking information');

    }

    // ============================================================
    // TIMESTAMP
    // ============================================================

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // ============================================================
    // EMAIL TEMPLATE VARIABLES
    // ============================================================

    const templateParams = {

      // Customer Details
      firstName: booking.firstName,
      lastName: booking.lastName,
      user_email: booking.email,
      phone: booking.phone,

      // Package Details
      package_name: booking.packageName,

      duration:
        booking.duration || "Custom Trip",

      // Travel Details
      travel_date: booking.travelDate,

      guests: booking.travelers,

      // Pricing
      price_per_person:
        booking.packagePrice.toLocaleString('en-IN'),

      total_amount:
        booking.totalAmount.toLocaleString('en-IN'),

      // Advance Amount
      advance_amount: Math.round(
        booking.totalAmount * 0.3
      ).toLocaleString('en-IN'),

      // Booking Reference
      booking_reference: booking.bookingRef,

      // Company Details
      company_name: 'Aadhera Vacation',

      company_phone: '8870929690',

      company_email:
        'adheeravacation2k25@gmail.com',

      // Additional Details
      booking_time: timestamp,

      special_requests:
        booking.specialRequests || 'None',

    };

    // ============================================================
    // SEND EMAIL
    // ============================================================

    const result = await emailjs.send(
      SERVICE_ID,
      CUSTOMER_TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    // ============================================================
    // SUCCESS RESPONSE
    // ============================================================

    if (result.status === 200) {

      return {
        success: true,
        message:
          'Booking confirmation email sent successfully!',
      };

    }

    // ============================================================
    // FAILED
    // ============================================================

    throw new Error(
      'Failed to send booking confirmation'
    );

  } catch (error) {

    console.error(
      'EmailJS Error:',
      error
    );

    return {

      success: false,

      message:
        error instanceof Error
          ? error.message
          : 'Failed to send confirmation email.',

    };

  }

}

// ============================================================
// CONFIG VALIDATION
// ============================================================

export function isEmailJSConfigured(): boolean {

  return (
    SERVICE_ID.length > 0 &&
    CUSTOMER_TEMPLATE_ID.length > 0 &&
    PUBLIC_KEY.length > 0
  );

}