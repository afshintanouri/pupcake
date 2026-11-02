export type CakeShape = 'round' | 'bone' | 'paw' | 'heart' | 'pup_head';

export type CakeSize = 'mini' | 'medium' | 'large';

export type ProteinType = 'kangaroo' | 'chicken' | 'beef' | 'salmon' | 'peanut_butter';

export type CarbType = 'oats_rice' | 'quinoa_flax' | 'grain_free';

export type FrostingType = 'greek_yogurt' | 'turmeric_gold' | 'beet_blush' | 'spirulina_green' | 'carob_swirl';

export interface ProteinOption {
  id: ProteinType;
  name: string;
  subtitle: string;
  description: string;
  caloriesPer100g: number;
  proteinPct: number;
  highlight: string;
  badge: string;
  priceModifier: number;
}

export interface CarbOption {
  id: CarbType;
  name: string;
  description: string;
  glutenFree: boolean;
  grainFree: boolean;
}

export interface FrostingOption {
  id: FrostingType;
  name: string;
  description: string;
  hex: string;
  accentHex: string;
  naturalColorSource: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'berries' | 'crunch' | 'special';
  icon: string;
}

export interface ShapeOption {
  id: CakeShape;
  name: string;
  description: string;
  recommendedFor: string;
  svgPath: string;
}

export interface SizeOption {
  id: CakeSize;
  name: string;
  diameter: string;
  servings: string;
  dogWeightGuide: string;
  basePrice: number;
  weightGrams: number;
}

export interface CustomCakeConfig {
  shape: CakeShape;
  size: CakeSize;
  protein: ProteinType;
  carb: CarbType;
  frosting: FrostingType;
  toppings: string[];
  pupName: string;
  pupAge: number;
  pupBreed: string;
  biscuitMessage: string;
  hasPhotoPrint: boolean;
  photoUrl: string | null;
  photoScale: number;
  includeCandle: boolean;
  specialDietaryNotes: string;
}

export interface AdelaideSuburb {
  name: string;
  postcode: string;
  zone: 'Metro Central' | 'Metro East' | 'Metro North' | 'Metro South' | 'Metro West' | 'Adelaide Hills Edge';
  deliveryFee: number;
  availableDays: string[];
}

export interface CakeOrder {
  id: string;
  createdAt: string;
  cakeConfig: CustomCakeConfig;
  totalPrice: number;
  deliveryDate: string;
  deliveryTimeSlot: 'morning' | 'afternoon';
  deliveryType: 'delivery' | 'pickup';
  suburb: string;
  postcode: string;
  streetAddress: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  deliveryNotes: string;
  status: 'confirmed' | 'baking' | 'out_for_delivery' | 'delivered';
}

export interface Testimonial {
  id: string;
  dogName: string;
  breed: string;
  suburb: string;
  ownerNames: string;
  quote: string;
  rating: number;
  cakeOrdered: string;
  dogAge: number;
}
