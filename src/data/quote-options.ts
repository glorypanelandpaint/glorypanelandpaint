/**
 * Choices for the truck & campervan quote form.
 * ContactForm ships this file to the browser, so keep it to option lists only.
 */

/** Buses and anything else go under "Other"; the customer names it in the Vehicle field. */
export const vehicleTypes = [
  'Truck',
  'Trailer',
  'Campervan',
  'Motorhome',
  'Caravan',
  'Fleet (multiple vehicles)',
  'Other',
] as const;

export type VehicleType = (typeof vehicleTypes)[number];

export const serviceGroups = [
  {
    label: 'Repairs',
    options: [
      'Accident damage repair',
      'Dent and panel repair',
      'Scratch and stone chip repair',
      'Fibreglass repair',
    ],
  },
  {
    label: 'Paint',
    options: ['Full respray', 'Cab respray', 'Partial respray', 'Colour change'],
  },
  {
    label: 'Other',
    options: ['Refurbishment or pre-sale tidy-up', 'Not sure – need advice'],
  },
] as const;

/** The insurers shown on the site, plus Other. */
export const insurers = [
  'AA Insurance',
  'AMI',
  'AON',
  'IAG',
  'Lumley',
  'NZI',
  'State',
  'Swann',
  'Tower',
  'Vero',
  'Other',
] as const;
