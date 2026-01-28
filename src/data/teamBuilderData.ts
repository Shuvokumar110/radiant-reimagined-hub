// Sport category images
import sportSoccer from "@/assets/team-builder/sport-soccer.jpg";
import sportBasketball from "@/assets/team-builder/sport-basketball.jpg";
import sportFootball from "@/assets/team-builder/sport-football.jpg";
import sportBaseball from "@/assets/team-builder/sport-baseball.jpg";
import sportTrack from "@/assets/team-builder/sport-track.jpg";
import sportCricket from "@/assets/team-builder/sport-cricket.jpg";
import sportBusiness from "@/assets/team-builder/sport-business.jpg";

export type SportType = 'soccer' | 'basketball' | 'american_football' | 'baseball_softball' | 'track_field' | 'cricket' | 'business';

export interface SportCategory {
  id: SportType;
  name: string;
  image: string;
  icon: string;
}

export interface ProductType {
  id: string;
  name: string;
  shortDescription: string;
  basePrice: number;
  image: string;
  fabricType: 'Sublimated' | 'Embroidered' | 'Heat Press';
  leadTime: 'Standard' | 'Rush';
}

export interface StyleOption {
  id: string;
  label: string;
  options: string[];
  defaultValue?: string;
}

export const sportCategories: SportCategory[] = [
  { id: 'soccer', name: 'Soccer', image: sportSoccer, icon: '⚽' },
  { id: 'basketball', name: 'Basketball', image: sportBasketball, icon: '🏀' },
  { id: 'american_football', name: 'American Football', image: sportFootball, icon: '🏈' },
  { id: 'baseball_softball', name: 'Baseball/Softball', image: sportBaseball, icon: '⚾' },
  { id: 'track_field', name: 'Track & Field', image: sportTrack, icon: '🏃' },
  { id: 'cricket', name: 'Cricket', image: sportCricket, icon: '🏏' },
  { id: 'business', name: 'Business', image: sportBusiness, icon: '👔' },
];

export const productsBySport: Record<SportType, ProductType[]> = {
  soccer: [
    { id: 'soccer-jersey-short', name: 'Jersey (Short Sleeve)', shortDescription: 'Competition-ready short sleeve jersey', basePrice: 35, image: sportSoccer, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'soccer-jersey-long', name: 'Jersey (Long Sleeve)', shortDescription: 'Performance long sleeve jersey', basePrice: 40, image: sportSoccer, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'soccer-shorts', name: 'Shorts', shortDescription: 'Lightweight athletic shorts', basePrice: 25, image: sportSoccer, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'soccer-socks', name: 'Socks', shortDescription: 'Pro-grade team socks', basePrice: 12, image: sportSoccer, fabricType: 'Heat Press', leadTime: 'Rush' },
    { id: 'soccer-full-kit', name: 'Full Kit Bundle', shortDescription: 'Jersey + Shorts + Socks', basePrice: 65, image: sportSoccer, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'soccer-warmup-hoodie', name: 'Warmup Hoodie', shortDescription: 'Team warmup hoodie', basePrice: 55, image: sportSoccer, fabricType: 'Embroidered', leadTime: 'Standard' },
    { id: 'soccer-warmup-jacket', name: 'Warmup Jacket', shortDescription: 'Lightweight training jacket', basePrice: 60, image: sportSoccer, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'soccer-warmup-pants', name: 'Warmup Pants', shortDescription: 'Athletic training pants', basePrice: 45, image: sportSoccer, fabricType: 'Sublimated', leadTime: 'Standard' },
  ],
  basketball: [
    { id: 'basketball-jersey', name: 'Jersey', shortDescription: 'Reversible game jersey', basePrice: 40, image: sportBasketball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'basketball-shorts', name: 'Shorts', shortDescription: 'Pro-cut basketball shorts', basePrice: 30, image: sportBasketball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'basketball-full-uniform', name: 'Full Uniform Bundle', shortDescription: 'Jersey + Shorts', basePrice: 65, image: sportBasketball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'basketball-shooting-shirt', name: 'Shooting Shirt', shortDescription: 'Warmup shooting shirt', basePrice: 35, image: sportBasketball, fabricType: 'Sublimated', leadTime: 'Rush' },
    { id: 'basketball-warmup', name: 'Warmup Suit', shortDescription: 'Complete warmup set', basePrice: 85, image: sportBasketball, fabricType: 'Embroidered', leadTime: 'Standard' },
  ],
  american_football: [
    { id: 'football-game-jersey', name: 'Game Jersey', shortDescription: 'Official game-day jersey', basePrice: 65, image: sportFootball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'football-practice-jersey', name: 'Practice Jersey', shortDescription: 'Durable practice jersey', basePrice: 45, image: sportFootball, fabricType: 'Sublimated', leadTime: 'Rush' },
    { id: 'football-pants', name: 'Pants', shortDescription: 'Padded football pants', basePrice: 55, image: sportFootball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'football-flag-set', name: 'Flag Football Set', shortDescription: 'Complete flag football kit', basePrice: 40, image: sportFootball, fabricType: 'Sublimated', leadTime: 'Rush' },
    { id: 'football-warmup', name: 'Warmup Gear', shortDescription: 'Team warmup apparel', basePrice: 75, image: sportFootball, fabricType: 'Embroidered', leadTime: 'Standard' },
  ],
  baseball_softball: [
    { id: 'baseball-jersey-button', name: 'Jersey (Button)', shortDescription: 'Traditional button-front jersey', basePrice: 45, image: sportBaseball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'baseball-jersey-pullover', name: 'Jersey (Pullover)', shortDescription: 'Modern pullover jersey', basePrice: 40, image: sportBaseball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'baseball-pants', name: 'Pants', shortDescription: 'Pro-style baseball pants', basePrice: 35, image: sportBaseball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'baseball-socks', name: 'Socks', shortDescription: 'Stirrup or solid socks', basePrice: 12, image: sportBaseball, fabricType: 'Heat Press', leadTime: 'Rush' },
    { id: 'baseball-full-uniform', name: 'Full Uniform Bundle', shortDescription: 'Jersey + Pants + Socks', basePrice: 85, image: sportBaseball, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'baseball-warmup', name: 'Warmup Gear', shortDescription: 'Pre-game warmup apparel', basePrice: 65, image: sportBaseball, fabricType: 'Embroidered', leadTime: 'Standard' },
  ],
  track_field: [
    { id: 'track-singlet', name: 'Singlet', shortDescription: 'Lightweight race singlet', basePrice: 30, image: sportTrack, fabricType: 'Sublimated', leadTime: 'Rush' },
    { id: 'track-shorts', name: 'Shorts', shortDescription: 'Performance running shorts', basePrice: 25, image: sportTrack, fabricType: 'Sublimated', leadTime: 'Rush' },
    { id: 'track-compression', name: 'Compression', shortDescription: 'Compression tights', basePrice: 35, image: sportTrack, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'track-warmups', name: 'Warmups', shortDescription: 'Team warmup suit', basePrice: 75, image: sportTrack, fabricType: 'Embroidered', leadTime: 'Standard' },
    { id: 'track-tees', name: 'Team Tees', shortDescription: 'Team training t-shirts', basePrice: 20, image: sportTrack, fabricType: 'Heat Press', leadTime: 'Rush' },
  ],
  cricket: [
    { id: 'cricket-jersey', name: 'Cricket Jersey', shortDescription: 'Performance cricket jersey', basePrice: 45, image: sportCricket, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'cricket-pants', name: 'Pants', shortDescription: 'Traditional cricket pants', basePrice: 40, image: sportCricket, fabricType: 'Sublimated', leadTime: 'Standard' },
    { id: 'cricket-training', name: 'Training Kit', shortDescription: 'Practice and training gear', basePrice: 55, image: sportCricket, fabricType: 'Sublimated', leadTime: 'Rush' },
    { id: 'cricket-sweater', name: 'Sweater/Warmup', shortDescription: 'Classic cricket sweater', basePrice: 65, image: sportCricket, fabricType: 'Embroidered', leadTime: 'Standard' },
  ],
  business: [
    { id: 'business-polo', name: 'Polo Shirts', shortDescription: 'Professional polo shirts', basePrice: 35, image: sportBusiness, fabricType: 'Embroidered', leadTime: 'Standard' },
    { id: 'business-button-down', name: 'Button-Down Shirts', shortDescription: 'Corporate dress shirts', basePrice: 45, image: sportBusiness, fabricType: 'Embroidered', leadTime: 'Standard' },
    { id: 'business-work-shirts', name: 'Work Shirts', shortDescription: 'Durable work shirts', basePrice: 40, image: sportBusiness, fabricType: 'Embroidered', leadTime: 'Rush' },
    { id: 'business-jackets', name: 'Jackets/Hoodies', shortDescription: 'Corporate outerwear', basePrice: 65, image: sportBusiness, fabricType: 'Embroidered', leadTime: 'Standard' },
    { id: 'business-caps', name: 'Caps', shortDescription: 'Branded headwear', basePrice: 20, image: sportBusiness, fabricType: 'Embroidered', leadTime: 'Rush' },
  ],
};

export const styleOptionsByProduct: Record<string, StyleOption[]> = {
  default: [
    { id: 'gender', label: 'Gender', options: ['Men', 'Women', 'Youth', 'Unisex'], defaultValue: 'Unisex' },
    { id: 'fit', label: 'Fit', options: ['Athletic', 'Regular'], defaultValue: 'Athletic' },
  ],
  'soccer-jersey-short': [
    { id: 'gender', label: 'Gender', options: ['Men', 'Women', 'Youth', 'Unisex'], defaultValue: 'Unisex' },
    { id: 'fit', label: 'Fit', options: ['Athletic', 'Regular'], defaultValue: 'Athletic' },
    { id: 'collar', label: 'Collar', options: ['V-Neck', 'Crew', 'Polo'], defaultValue: 'V-Neck' },
  ],
  'soccer-jersey-long': [
    { id: 'gender', label: 'Gender', options: ['Men', 'Women', 'Youth', 'Unisex'], defaultValue: 'Unisex' },
    { id: 'fit', label: 'Fit', options: ['Athletic', 'Regular'], defaultValue: 'Athletic' },
    { id: 'collar', label: 'Collar', options: ['V-Neck', 'Crew', 'Polo'], defaultValue: 'V-Neck' },
  ],
  'basketball-jersey': [
    { id: 'gender', label: 'Gender', options: ['Men', 'Women', 'Youth', 'Unisex'], defaultValue: 'Unisex' },
    { id: 'fit', label: 'Fit', options: ['Athletic', 'Regular'], defaultValue: 'Athletic' },
    { id: 'collar', label: 'Collar', options: ['V-Neck', 'Crew', 'Tank'], defaultValue: 'V-Neck' },
  ],
  'business-polo': [
    { id: 'gender', label: 'Gender', options: ['Men', 'Women', 'Unisex'], defaultValue: 'Unisex' },
    { id: 'fit', label: 'Fit', options: ['Classic', 'Slim'], defaultValue: 'Classic' },
    { id: 'collar', label: 'Collar', options: ['Standard Polo', 'Mandarin'], defaultValue: 'Standard Polo' },
  ],
};

export const addOnOptions = [
  { id: 'extra_logo', label: 'Extra Logo Placement', description: 'Add logos to additional locations', price: 5 },
  { id: 'sponsor', label: 'Sponsor Placement', description: 'Add sponsor logos to jerseys', price: 8 },
  { id: 'patch', label: 'Custom Patch', description: 'Add custom embroidered patches', price: 10 },
  { id: 'name_addon', label: 'Player Name Add-on', description: 'Individual player name printing', price: 3 },
];

export const logoPlacementOptions = [
  { id: 'left_chest', label: 'Left Chest' },
  { id: 'center_chest', label: 'Center Chest' },
  { id: 'sleeve_left', label: 'Left Sleeve' },
  { id: 'sleeve_right', label: 'Right Sleeve' },
  { id: 'back_top', label: 'Back Top' },
  { id: 'back_bottom', label: 'Back Bottom' },
  { id: 'shorts_leg', label: 'Shorts Leg' },
];

export const sizeOptions = ['YXS', 'YS', 'YM', 'YL', 'YXL', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export const patternOptions = [
  { id: 'solid', label: 'Solid', preview: 'solid' },
  { id: 'stripes', label: 'Stripes', preview: 'stripes' },
  { id: 'gradient', label: 'Gradient', preview: 'gradient' },
  { id: 'diagonal', label: 'Diagonal', preview: 'diagonal' },
  { id: 'checkered', label: 'Checkered', preview: 'checkered' },
];

export const fontOptions = [
  { id: 'athletic', label: 'Athletic Block' },
  { id: 'college', label: 'College Style' },
  { id: 'modern', label: 'Modern Sans' },
  { id: 'script', label: 'Script' },
  { id: 'outline', label: 'Block Outline' },
];

// Template gallery images
import templateSolidBlack from "@/assets/templates/jersey-solid-black.jpg";
import templateStripesNavy from "@/assets/templates/jersey-stripes-navy.jpg";
import templateGradientRed from "@/assets/templates/jersey-gradient-red.jpg";
import templateAccentGreen from "@/assets/templates/jersey-accent-green.jpg";
import templateSashPurple from "@/assets/templates/jersey-sash-purple.jpg";
import templateGeoOrange from "@/assets/templates/jersey-geo-orange.jpg";

export interface DesignTemplate {
  id: string;
  name: string;
  category: 'solid' | 'stripes' | 'gradient' | 'accent' | 'geometric';
  image: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const designTemplates: DesignTemplate[] = [
  { id: 'solid-black', name: 'Classic Black', category: 'solid', image: templateSolidBlack, primaryColor: '#000000', secondaryColor: '#FFFFFF', accentColor: '#808080' },
  { id: 'stripes-navy', name: 'Navy Stripes', category: 'stripes', image: templateStripesNavy, primaryColor: '#1E3A8A', secondaryColor: '#FFFFFF', accentColor: '#1E3A8A' },
  { id: 'gradient-red', name: 'Red Gradient', category: 'gradient', image: templateGradientRed, primaryColor: '#DC2626', secondaryColor: '#000000', accentColor: '#FFFFFF' },
  { id: 'accent-green', name: 'Green Accent', category: 'accent', image: templateAccentGreen, primaryColor: '#FFFFFF', secondaryColor: '#059669', accentColor: '#000000' },
  { id: 'sash-purple', name: 'Purple Sash', category: 'geometric', image: templateSashPurple, primaryColor: '#7C3AED', secondaryColor: '#F59E0B', accentColor: '#FFFFFF' },
  { id: 'geo-orange', name: 'Orange Geometric', category: 'geometric', image: templateGeoOrange, primaryColor: '#F97316', secondaryColor: '#FFFFFF', accentColor: '#000000' },
];

export const templateCategories = [
  { id: 'all', label: 'All Designs' },
  { id: 'solid', label: 'Solid' },
  { id: 'stripes', label: 'Stripes' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'accent', label: 'Accent' },
  { id: 'geometric', label: 'Geometric' },
];
