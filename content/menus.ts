import { dietaryById, type DietaryId } from './dietary.ts';
import { zoneById, type ZoneId } from './zones.ts';

export type ServiceStyle = 'drop-off' | 'staffed';

export interface MenuDish {
  /** Dish title as printed on the menu spread. */
  name: string;
  /** Short accompaniment or serving detail. */
  detail?: string;
  /** Dietary mark IDs applicable to this dish. A dish marked 'vegan' also counts as 'vegetarian'. */
  dietary: readonly DietaryId[];
}

export interface CateringMenu {
  /** Stable URL-safe identifier used for /menus/#<id> anchors and vignettes. */
  id: string;
  /** Two-digit magazine contents number (e.g. "01"). */
  number: string;
  /** Display title of the menu. */
  name: string;
  /** Short serving format description (e.g. "canapés, eight pieces per guest"). */
  format: string;
  /** Editorial standfirst introducing the menu spread. */
  description: string;
  /** Service styles offered for this menu. */
  serviceStyles: readonly ServiceStyle[];
  /** Indicative price per guest in integer GBP pence (e.g. 2800 = £28.00). */
  pricePerHeadPence: number;
  /** Minimum guest count for this menu (before any zone minimum). */
  minGuests: number;
  /** Maximum guest count for this menu. */
  maxGuests: number;
  /** Base notice required in days (before any zone extra lead days). */
  leadTimeDays: number;
  /** Delivery zone IDs where this menu is available. */
  zones: readonly ZoneId[];
  /** Whether the menu is currently in season / available for enquiries. */
  available: boolean;
  /** Required when available is false (e.g. "Out of season — returns May 2027"). */
  availabilityNote?: string;
  /** Dishes on the menu; dietary coverage is derived automatically from this list. */
  dishes: readonly MenuDish[];
}

export const menus: readonly CateringMenu[] = [
  {
    id: 'reception-canapes',
    number: '01',
    name: 'The Reception Canapés',
    format: 'Canapés, eight pieces per guest',
    description:
      'Designed for standing rooms, gallery openings and evening drinks where guests hold a glass in one hand. Delivered chilled on stoneware platters or circulated warm by our floor team.',
    serviceStyles: ['drop-off', 'staffed'],
    pricePerHeadPence: 2800,
    minGuests: 30,
    maxGuests: 300,
    leadTimeDays: 7,
    zones: ['central', 'inner', 'outer', 'home-counties'],
    available: true,
    dishes: [
      { name: 'Saffron arancini', detail: 'smoked garlic aioli', dietary: ['vegetarian'] },
      { name: 'Beetroot-cured salmon on rye blini', detail: 'dill crème fraîche', dietary: ['nut-free'] },
      { name: 'Charred corn and chipotle tostada', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Lamb kofta', detail: 'pomegranate yoghurt', dietary: ['gluten-free', 'nut-free'] },
      { name: 'Whipped feta and honeyed fig crostini', dietary: ['vegetarian', 'nut-free'] },
      { name: 'Miso aubergine on black sesame cracker', dietary: ['vegan', 'dairy-free', 'nut-free'] },
      { name: 'Crab and yuzu tartlet', dietary: ['nut-free'] },
      { name: 'Dark chocolate and sea salt truffle', dietary: ['vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: 'bowl-food',
    number: '02',
    name: 'Bowl Food Evening',
    format: 'Five small bowls per guest',
    description:
      'Substantial enough to replace dinner while keeping the room on its feet. Finished hot in your venue kitchen or a mobile pass and circulated by our waiting staff throughout the evening.',
    serviceStyles: ['staffed'],
    pricePerHeadPence: 3600,
    minGuests: 40,
    maxGuests: 250,
    leadTimeDays: 10,
    zones: ['central', 'inner', 'outer'],
    available: true,
    dishes: [
      { name: 'Saffron chicken', detail: 'herbed freekeh, preserved lemon', dietary: ['dairy-free', 'nut-free'] },
      { name: 'Slow-roast pork belly', detail: 'apple and fennel slaw', dietary: ['gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Wild mushroom orzo', detail: 'aged parmesan', dietary: ['vegetarian', 'nut-free'] },
      { name: 'Chickpea and spinach dal', detail: 'crisp shallots', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Cardamom panna cotta', detail: 'poached rhubarb', dietary: ['vegetarian', 'gluten-free', 'nut-free'] },
    ],
  },
  {
    id: 'long-table-feast',
    number: '03',
    name: 'The Long-Table Feast',
    format: 'Sharing platters down the table',
    description:
      'Our signature sit-down format: generous platters laid straight down linen runners so guests pass dishes across the table. Works equally well for studio suppers, client lunches and celebrations.',
    serviceStyles: ['drop-off', 'staffed'],
    pricePerHeadPence: 4200,
    minGuests: 20,
    maxGuests: 120,
    leadTimeDays: 7,
    zones: ['central', 'inner', 'outer', 'home-counties'],
    available: true,
    dishes: [
      { name: 'Saffron-roast chicken thighs', detail: 'charred lemon', dietary: ['gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Slow-cooked lamb shoulder', detail: 'salsa verde', dietary: ['gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Roast squash, Puy lentils, labneh', dietary: ['vegetarian', 'gluten-free', 'nut-free'] },
      { name: 'Jewelled herb rice', detail: 'barberries', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Charred hispi cabbage', detail: 'tahini and chilli', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Warm flatbreads and three dips', dietary: ['vegetarian', 'nut-free'] },
      { name: 'Orange-blossom polenta cake', dietary: ['vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: 'plated-dinner',
    number: '04',
    name: 'The Plated Dinner',
    format: 'Three courses, plated and served',
    description:
      'Formal three-course dining for boardrooms, private dining rooms and milestone dinners. Our chefs plate to order on site and our front-of-house team manages wine service and clearing.',
    serviceStyles: ['staffed'],
    pricePerHeadPence: 6400,
    minGuests: 30,
    maxGuests: 180,
    leadTimeDays: 21,
    zones: ['central', 'inner', 'outer', 'home-counties'],
    available: true,
    dishes: [
      { name: 'Heritage tomato, burrata, basil oil', dietary: ['vegetarian', 'gluten-free', 'nut-free'] },
      { name: 'Saffron-poached cod', detail: 'mussels, braised fennel', dietary: ['gluten-free', 'nut-free'] },
      { name: 'Celeriac steak, hazelnut crumb, brown butter', detail: 'vegan version on request', dietary: ['vegetarian', 'gluten-free'] },
      { name: 'Burnt honey tart', detail: 'crème fraîche', dietary: ['vegetarian', 'nut-free'] },
    ],
  },
  {
    id: 'working-lunch',
    number: '05',
    name: 'The Working Lunch',
    format: 'Boxed lunches or platters for meeting rooms',
    description:
      'Built for board tables, workshops and agency all-hands. Arrives labelled by dietary requirement in recyclable kraft boxes or linen-lined platters ready to set straight down.',
    serviceStyles: ['drop-off'],
    pricePerHeadPence: 1850,
    minGuests: 10,
    maxGuests: 150,
    leadTimeDays: 2,
    zones: ['central', 'inner'],
    available: true,
    dishes: [
      { name: 'Sourdough sandwiches', detail: 'roast chicken & tarragon; egg & cress; hummus & roast pepper (vegan option)', dietary: ['vegan'] },
      { name: 'Freekeh, roast carrot and herb salad', dietary: ['vegan', 'dairy-free', 'nut-free'] },
      { name: 'New potato, pea and mint salad', dietary: ['vegetarian', 'gluten-free', 'nut-free'] },
      { name: 'Seasonal fruit', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Oat and date flapjack', dietary: ['vegan', 'dairy-free'] },
    ],
  },
  {
    id: 'breakfast-meeting',
    number: '06',
    name: 'The Breakfast Meeting',
    format: 'Platters for early starts, delivered by 08:00',
    description:
      'Baked and assembled from 05:00 in our Bermondsey arch so pastries arrive still crisp for early briefings, press previews and client pitches across Central and Inner London.',
    serviceStyles: ['drop-off'],
    pricePerHeadPence: 1400,
    minGuests: 10,
    maxGuests: 120,
    leadTimeDays: 2,
    zones: ['central', 'inner'],
    available: true,
    dishes: [
      { name: 'Mini cardamom buns and almond croissants', dietary: ['vegetarian'] },
      { name: 'Bircher muesli', detail: 'poached plums', dietary: ['vegetarian', 'nut-free'] },
      { name: 'Coconut yoghurt pots', detail: 'toasted seeds', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
      { name: 'Bacon and smoked-ketchup brioche rolls', dietary: ['nut-free'] },
      { name: 'Freshly squeezed orange juice', dietary: ['vegan', 'gluten-free', 'dairy-free', 'nut-free'] },
    ],
  },
  {
    id: 'garden-party',
    number: '07',
    name: 'The Summer Garden Party',
    format: 'Grazing tables and grill',
    description:
      'Long outdoor grazing tables paired with charcoal-grilled plates for courtyards, terraces and country gardens. Returns each spring once English soft fruit and courgettes come into season.',
    serviceStyles: ['staffed'],
    pricePerHeadPence: 4800,
    minGuests: 40,
    maxGuests: 200,
    leadTimeDays: 21,
    zones: ['inner', 'outer', 'home-counties'],
    available: false,
    availabilityNote: 'Out of season — returns May 2027',
    dishes: [
      { name: 'Grilled flatbreads', detail: 'whipped feta, za\'atar', dietary: ['vegetarian', 'nut-free'] },
      { name: 'Charcoal chicken shawarma', dietary: ['dairy-free', 'nut-free'] },
      { name: 'Halloumi, watermelon and mint skewers', dietary: ['vegetarian', 'gluten-free', 'nut-free'] },
      { name: 'Strawberries, elderflower cream', dietary: ['vegetarian', 'gluten-free', 'nut-free'] },
    ],
  },
];

/** Format integer pence as "from £28.00 per head". */
export function formatPricePerHead(pence: number): string {
  return `from £${(pence / 100).toFixed(2)} per head`;
}

/** Format integer pence as "£28.00". */
export function formatPriceShort(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

/** Format service styles for display. */
export function formatServiceStyles(styles: readonly ServiceStyle[]): string {
  if (styles.length === 2) return 'Drop-off or staffed';
  return styles[0] === 'staffed' ? 'Staffed' : 'Drop-off';
}

/**
 * Derive a menu's dietary coverage from its dishes.
 * Every dish marked 'vegan' is also treated as 'vegetarian'.
 */
export function menuDietaryCoverage(menu: CateringMenu): DietaryId[] {
  const covered = new Set<DietaryId>();
  for (const dish of menu.dishes) {
    for (const mark of dish.dietary) {
      covered.add(mark);
      if (mark === 'vegan') covered.add('vegetarian');
    }
  }
  const order: DietaryId[] = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'];
  return order.filter(id => covered.has(id));
}

/** Sort menus in collection order with unavailable / out-of-season menus last. */
export function orderedMenus(list: readonly CateringMenu[] = menus): CateringMenu[] {
  const available = list.filter(m => m.available);
  const unavailable = list.filter(m => !m.available);
  return [...available, ...unavailable];
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateMenus(list: readonly CateringMenu[] = menus): void {
  const seenIds = new Set<string>();
  const seenNumbers = new Set<string>();

  for (const menu of list) {
    const label = `menus.${menu.id || '(missing)'}`;
    if (!menu.id || !slugPattern.test(menu.id)) {
      throw new Error(`${label}: id must be a URL-safe slug`);
    }
    if (seenIds.has(menu.id)) {
      throw new Error(`${label}: duplicate menu id`);
    }
    seenIds.add(menu.id);

    if (!menu.number.trim()) throw new Error(`${label}.number: required`);
    if (seenNumbers.has(menu.number)) throw new Error(`${label}.number: duplicate contents number "${menu.number}"`);
    seenNumbers.add(menu.number);

    if (!menu.name.trim()) throw new Error(`${label}.name: required`);
    if (!menu.format.trim()) throw new Error(`${label}.format: required`);
    if (!menu.description.trim()) throw new Error(`${label}.description: required`);

    if (!Number.isInteger(menu.pricePerHeadPence) || menu.pricePerHeadPence <= 0 || menu.pricePerHeadPence >= 20000) {
      throw new Error(`${label}.pricePerHeadPence: must be a positive integer under 20000 pence`);
    }
    if (!Number.isInteger(menu.minGuests) || !Number.isInteger(menu.maxGuests) || menu.minGuests < 1 || menu.minGuests > menu.maxGuests || menu.maxGuests > 500) {
      throw new Error(`${label}.minGuests/maxGuests: must satisfy 1 <= minGuests <= maxGuests <= 500`);
    }
    if (!Number.isInteger(menu.leadTimeDays) || menu.leadTimeDays < 1) {
      throw new Error(`${label}.leadTimeDays: must be an integer >= 1`);
    }
    if (!menu.serviceStyles.length) {
      throw new Error(`${label}.serviceStyles: at least one service style is required`);
    }
    if (!menu.zones.length) {
      throw new Error(`${label}.zones: at least one delivery zone is required`);
    }
    for (const zoneId of menu.zones) {
      if (!zoneById.has(zoneId)) {
        throw new Error(`${label}.zones: unknown zone id "${zoneId}"`);
      }
    }
    if (!menu.available && (!menu.availabilityNote || !menu.availabilityNote.trim())) {
      throw new Error(`${label}.availabilityNote: required when available is false`);
    }
    if (!menu.dishes.length) {
      throw new Error(`${label}.dishes: at least one dish is required`);
    }
    for (const dish of menu.dishes) {
      if (!dish.name.trim()) {
        throw new Error(`${label}.dishes: dish name is required`);
      }
      for (const markId of dish.dietary) {
        if (!dietaryById.has(markId)) {
          throw new Error(`${label}.dishes["${dish.name}"].dietary: unknown dietary id "${markId}"`);
        }
      }
    }
  }
}
