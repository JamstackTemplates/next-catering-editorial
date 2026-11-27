import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short editorial masthead wordmark parts for typographic styling. */
  wordmark: {
    leading: string;
    ampersand: string;
    trailing: string;
  };
  /** Editorial issue line shown in the masthead and cover hero (frequent owner edit). */
  issueLine: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public telephone number; blank hides it. */
  phone: string;
  /** Production kitchen neighbourhood — never include a street number or visitor pin. */
  kitchenLocation: string;
  /** Founder and head chef name. */
  founder: string;
  /** Cuisines served, used in FoodEstablishment structured data. */
  cuisines: readonly string[];
  /** Price range indicator for structured data. */
  priceRange: string;
  /** Office enquiry hours in Europe/London (same-day intervals only). */
  officeHours: readonly OpeningHours[];
  /** Neutral static summary of office hours for non-JS and initial render. */
  officeHoursSummary: string;
  /** Shared allergen statement shown on Menus, Home and The Kitchen. */
  allergenStatement: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Saffron & Linen Catering',
  wordmark: {
    leading: 'Saffron',
    ampersand: '&',
    trailing: 'Linen',
  },
  issueLine: 'Issue No. 26 · Winter menus · London',
  tagline: 'Feed the room, beautifully.',
  introduction:
    'London event and corporate catering. Compare menus, dietary options, minimum guest numbers and delivery zones, then request a quote.',
  email: 'hello@saffronandlinen.example',
  phone: '020 7946 0318',
  kitchenLocation: 'Bermondsey, London SE1 · near Tower Bridge',
  founder: 'Nadia Hale',
  cuisines: ['Modern British', 'Middle Eastern', 'Mediterranean'],
  priceRange: '££–£££',
  officeHours: [
    { day: 'Monday', opens: '09:00', closes: '17:30' },
    { day: 'Tuesday', opens: '09:00', closes: '17:30' },
    { day: 'Wednesday', opens: '09:00', closes: '17:30' },
    { day: 'Thursday', opens: '09:00', closes: '17:30' },
    { day: 'Friday', opens: '09:00', closes: '17:30' },
    { day: 'Saturday' },
    { day: 'Sunday' },
  ],
  officeHoursSummary: 'Office hours: Mon–Fri 09:00–17:30',
  allergenStatement:
    'Every dish is labelled on the table with its dietary marks and full allergen sheet. We prepare gluten-free and vegan plates separately, but our Bermondsey kitchen handles all 14 major allergens — including nuts and sesame — so no dish can be guaranteed allergen-free.',
  enquiries: {
    title: 'Request a quote',
    introduction:
      'Tell us about your event and we will reply within one working day with a written quote or a few questions. Nothing is booked until you accept a written quote and we confirm in writing.',
    usefulToInclude: [
      'Event date and start/finish time',
      'Venue postcode',
      'Approximate guest count',
      'Menu(s) you are considering',
      'Dietary needs with numbers (e.g. "6 vegan, 2 coeliac")',
      'Drop-off or staffed service',
      'Budget per head, if you have one',
      'Venue access notes (lifts, stairs, loading bay, setup time)',
    ],
  },
};
