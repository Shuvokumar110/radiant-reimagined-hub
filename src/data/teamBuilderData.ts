// Sport category images - using new uploaded images
import sportSoccer from "@/assets/categories/soccer.png";
import sportBasketball from "@/assets/categories/basketball.png";
import sportFootball from "@/assets/categories/american-football.png";
import sportBaseball from "@/assets/categories/soccer.png"; // Placeholder - no baseball image provided
import sportVolleyball from "@/assets/categories/volleyball.png";
import sportNetball from "@/assets/categories/netball.png";
import sportCricket from "@/assets/categories/cricket.png";
import sportBusiness from "@/assets/team-builder/sport-business.jpg";

// Product images - Soccer
import soccerJerseyShort from "@/assets/products/soccer-jersey-short-new.png";
import soccerShorts from "@/assets/products/soccer-shorts-new.png";
import soccerSocks from "@/assets/products/soccer-socks-new.png";
import soccerFullKit from "@/assets/products/soccer-full-kit-new.png";

// Product images - Basketball
import basketballJersey from "@/assets/products/basketball-jersey.jpg";
import basketballShorts from "@/assets/products/basketball-shorts.jpg";
import basketballFullUniform from "@/assets/products/basketball-full-uniform.jpg";
import basketballShootingShirt from "@/assets/products/basketball-shooting-shirt.jpg";
import basketballWarmup from "@/assets/products/basketball-warmup.jpg";

// Product images - American Football
import footballGameJersey from "@/assets/products/football-game-jersey.jpg";
import footballPracticeJersey from "@/assets/products/football-practice-jersey.jpg";
import footballPants from "@/assets/products/football-pants.jpg";
import footballFlagSet from "@/assets/products/football-flag-set.jpg";
import footballWarmup from "@/assets/products/football-warmup.jpg";

// Product images - Baseball/Softball
import baseballJerseyButton from "@/assets/products/baseball-jersey-button.jpg";
import baseballJerseyPullover from "@/assets/products/baseball-jersey-pullover.jpg";
import baseballPants from "@/assets/products/baseball-pants.jpg";
import baseballSocks from "@/assets/products/baseball-socks.jpg";
import baseballFullUniform from "@/assets/products/baseball-full-uniform.jpg";
import baseballWarmup from "@/assets/products/baseball-warmup.jpg";

// Product images - Track & Field
import trackSinglet from "@/assets/products/track-singlet.jpg";
import trackShorts from "@/assets/products/track-shorts.jpg";
import trackCompression from "@/assets/products/track-compression.jpg";
import trackWarmups from "@/assets/products/track-warmups.jpg";
import trackTees from "@/assets/products/track-tees.jpg";

// Product images - Cricket
import cricketJersey from "@/assets/products/cricket-jersey.jpg";
import cricketPants from "@/assets/products/cricket-pants.jpg";
import cricketTraining from "@/assets/products/cricket-training.jpg";
import cricketSweater from "@/assets/products/cricket-sweater.jpg";

// Product images - Business
import businessPolo from "@/assets/products/business-polo.jpg";
import businessButtonDown from "@/assets/products/business-button-down.jpg";
import businessWorkShirts from "@/assets/products/business-work-shirts.jpg";
import businessJackets from "@/assets/products/business-jackets.jpg";
import businessCaps from "@/assets/products/business-caps.jpg";

export type SportType = 'soccer' | 'basketball' | 'american_football' | 'baseball_softball' | 'volleyball' | 'netball' | 'cricket' | 'business';

export interface SportCategory {
  id: SportType;
  name: string;
  image: string;
}

export interface ProductType {
  id: string;
  name: string;
  shortDescription: string;
  basePrice: number;
  image: string;
  fabricType: 'Sublimated' | 'Embroidered' | 'Heat Press';
  leadTime: 'Standard' | 'Rush';
  moq: number;
}

export interface StyleOption {
  id: string;
  label: string;
  options: string[];
  defaultValue?: string;
}

export const sportCategories: SportCategory[] = [
  { id: 'soccer', name: 'Soccer', image: sportSoccer },
  { id: 'basketball', name: 'Basketball', image: sportBasketball },
  { id: 'american_football', name: 'American Football', image: sportFootball },
  { id: 'baseball_softball', name: 'Baseball/Softball', image: sportBaseball },
  { id: 'volleyball', name: 'Volleyball', image: sportVolleyball },
  { id: 'netball', name: 'Netball', image: sportNetball },
  { id: 'cricket', name: 'Cricket', image: sportCricket },
  { id: 'business', name: 'Business', image: sportBusiness },
];

export const productsBySport: Record<SportType, ProductType[]> = {
  soccer: [
    { id: 'soccer-jersey-short', name: 'Jersey (Short Sleeve)', shortDescription: 'Competition-ready short sleeve jersey', basePrice: 35, image: soccerJerseyShort, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'soccer-shorts', name: 'Shorts', shortDescription: 'Lightweight athletic shorts', basePrice: 25, image: soccerShorts, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'soccer-socks', name: 'Socks', shortDescription: 'Pro-grade team socks', basePrice: 12, image: soccerSocks, fabricType: 'Heat Press', leadTime: 'Rush', moq: 18 },
    { id: 'soccer-full-kit', name: 'Full Kit Bundle', shortDescription: 'Jersey + Shorts + Socks', basePrice: 65, image: soccerFullKit, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
  ],
  basketball: [
    { id: 'basketball-jersey', name: 'Jersey', shortDescription: 'Reversible game jersey', basePrice: 40, image: basketballJersey, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'basketball-shorts', name: 'Shorts', shortDescription: 'Pro-cut basketball shorts', basePrice: 30, image: basketballShorts, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'basketball-full-uniform', name: 'Full Uniform Bundle', shortDescription: 'Jersey + Shorts', basePrice: 65, image: basketballFullUniform, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'basketball-shooting-shirt', name: 'Shooting Shirt', shortDescription: 'Warmup shooting shirt', basePrice: 35, image: basketballShootingShirt, fabricType: 'Sublimated', leadTime: 'Rush', moq: 18 },
    { id: 'basketball-warmup', name: 'Warmup Suit', shortDescription: 'Complete warmup set', basePrice: 85, image: basketballWarmup, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
  ],
  american_football: [
    { id: 'football-game-jersey', name: 'Game Jersey', shortDescription: 'Official game-day jersey', basePrice: 65, image: footballGameJersey, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'football-practice-jersey', name: 'Practice Jersey', shortDescription: 'Durable practice jersey', basePrice: 45, image: footballPracticeJersey, fabricType: 'Sublimated', leadTime: 'Rush', moq: 18 },
    { id: 'football-pants', name: 'Pants', shortDescription: 'Padded football pants', basePrice: 55, image: footballPants, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'football-flag-set', name: 'Flag Football Set', shortDescription: 'Complete flag football kit', basePrice: 40, image: footballFlagSet, fabricType: 'Sublimated', leadTime: 'Rush', moq: 18 },
    { id: 'football-warmup', name: 'Warmup Gear', shortDescription: 'Team warmup apparel', basePrice: 75, image: footballWarmup, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
  ],
  baseball_softball: [
    { id: 'baseball-jersey-button', name: 'Jersey (Button)', shortDescription: 'Traditional button-front jersey', basePrice: 45, image: baseballJerseyButton, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'baseball-jersey-pullover', name: 'Jersey (Pullover)', shortDescription: 'Modern pullover jersey', basePrice: 40, image: baseballJerseyPullover, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'baseball-pants', name: 'Pants', shortDescription: 'Pro-style baseball pants', basePrice: 35, image: baseballPants, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'baseball-socks', name: 'Socks', shortDescription: 'Stirrup or solid socks', basePrice: 12, image: baseballSocks, fabricType: 'Heat Press', leadTime: 'Rush', moq: 18 },
    { id: 'baseball-full-uniform', name: 'Full Uniform Bundle', shortDescription: 'Jersey + Pants + Socks', basePrice: 85, image: baseballFullUniform, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'baseball-warmup', name: 'Warmup Gear', shortDescription: 'Pre-game warmup apparel', basePrice: 65, image: baseballWarmup, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
  ],
  volleyball: [
    { id: 'volleyball-jersey', name: 'Jersey', shortDescription: 'Performance volleyball jersey', basePrice: 35, image: soccerJerseyShort, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'volleyball-shorts', name: 'Shorts', shortDescription: 'Athletic volleyball shorts', basePrice: 25, image: soccerShorts, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'volleyball-warmup', name: 'Warmup Jacket', shortDescription: 'Team warmup jacket', basePrice: 55, image: soccerJerseyShort, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
  ],
  netball: [
    { id: 'netball-dress', name: 'Netball Dress', shortDescription: 'Performance netball dress', basePrice: 45, image: soccerJerseyShort, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'netball-jersey', name: 'Jersey', shortDescription: 'Netball jersey top', basePrice: 35, image: soccerJerseyShort, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'netball-skirt', name: 'Skirt', shortDescription: 'Athletic netball skirt', basePrice: 25, image: soccerShorts, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
  ],
  cricket: [
    { id: 'cricket-jersey', name: 'Cricket Jersey', shortDescription: 'Performance cricket jersey', basePrice: 45, image: cricketJersey, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'cricket-pants', name: 'Pants', shortDescription: 'Traditional cricket pants', basePrice: 40, image: cricketPants, fabricType: 'Sublimated', leadTime: 'Standard', moq: 18 },
    { id: 'cricket-training', name: 'Training Kit', shortDescription: 'Practice and training gear', basePrice: 55, image: cricketTraining, fabricType: 'Sublimated', leadTime: 'Rush', moq: 18 },
    { id: 'cricket-sweater', name: 'Sweater/Warmup', shortDescription: 'Classic cricket sweater', basePrice: 65, image: cricketSweater, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
  ],
  business: [
    { id: 'business-polo', name: 'Polo Shirts', shortDescription: 'Professional polo shirts', basePrice: 35, image: businessPolo, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
    { id: 'business-button-down', name: 'Button-Down Shirts', shortDescription: 'Corporate dress shirts', basePrice: 45, image: businessButtonDown, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
    { id: 'business-work-shirts', name: 'Work Shirts', shortDescription: 'Durable work shirts', basePrice: 40, image: businessWorkShirts, fabricType: 'Embroidered', leadTime: 'Rush', moq: 18 },
    { id: 'business-jackets', name: 'Jackets/Hoodies', shortDescription: 'Corporate outerwear', basePrice: 65, image: businessJackets, fabricType: 'Embroidered', leadTime: 'Standard', moq: 18 },
    { id: 'business-caps', name: 'Caps', shortDescription: 'Branded headwear', basePrice: 20, image: businessCaps, fabricType: 'Embroidered', leadTime: 'Rush', moq: 18 },
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
  { id: 'logo', label: 'Logo Placement', description: 'Add logo to your uniform', price: 5 },
  { id: 'sublimated_logo', label: 'Sublimated Logo', description: 'Full-color dye-sublimated logo printing', price: 3 },
  { id: 'embroidery_logo', label: 'Embroidery Logo', description: 'Premium embroidered logo', price: 7 },
  { id: 'sponsor', label: 'Sponsor Placement', description: 'Add sponsor logos to jerseys', price: 8 },
  { id: 'patch', label: 'Custom Patch', description: 'Add custom embroidered patches', price: 10 },
  { id: 'name_addon', label: 'Player Name', description: 'Individual player name printing', price: 3 },
  { id: 'number_addon', label: 'Player Number', description: 'Individual player number printing', price: 3 },
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
