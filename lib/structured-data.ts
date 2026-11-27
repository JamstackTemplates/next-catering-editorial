import { business } from '../content/business.ts';
import { menus } from '../content/menus.ts';
import { deliveryZones } from '../content/zones.ts';
import { absoluteUrl } from './paths.ts';

/**
 * FoodEstablishment JSON-LD derived from business, menus and delivery zones.
 * Locality London and postalCode SE1 only — never a street number.
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const menusUrl = absoluteUrl('/menus/');

  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    servesCuisine: [...business.cuisines],
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      postalCode: 'SE1',
      addressCountry: 'GB',
    },
    areaServed: deliveryZones.map(zone => ({
      '@type': 'AdministrativeArea',
      name: zone.name,
    })),
    hasMenu: {
      '@type': 'Menu',
      name: `${business.name} Menus`,
      ...(menusUrl ? { url: menusUrl } : {}),
      hasMenuSection: menus
        .filter(menu => menu.available)
        .map(menu => ({
          '@type': 'MenuSection',
          name: menu.name,
          description: `${menu.format}. ${menu.description}`,
          offers: {
            '@type': 'Offer',
            price: (menu.pricePerHeadPence / 100).toFixed(2),
            priceCurrency: 'GBP',
          },
          hasMenuItem: menu.dishes.map(dish => ({
            '@type': 'MenuItem',
            name: dish.name,
            ...(dish.detail ? { description: dish.detail } : {}),
          })),
        })),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
