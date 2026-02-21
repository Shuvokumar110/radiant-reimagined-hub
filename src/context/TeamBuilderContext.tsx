import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SportType, ProductType } from '@/data/teamBuilderData';

export interface RosterEntry {
  id: string;
  playerName: string;
  jerseyNumber: string;
  size: string;
  quantity: number;
  notes: string;
}

export interface DesignConfig {
  selectedTemplateId: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  pattern: string;
  logos: {
    id: string;
    placement: string;
    url: string;
    size: number;
  }[];
  teamName: string;
  teamNameFont: string;
  teamNameColor: string;
  teamNamePlacement: string;
  frontNumber: boolean;
  backNumber: boolean;
  numberFont: string;
  numberSize: 'small' | 'medium' | 'large';
  numberOutline: boolean;
  playerNameFont: string;
  playerNameUppercase: boolean;
  playerNamePlacement: string;
}

export interface StyleConfig {
  gender: string;
  fit: string;
  sleeve: string;
  collar: string;
  fabric: string;
  addOns: {
    logoPlacement: boolean;
    sublimatedLogo: boolean;
    embroideryLogo: boolean;
    sponsorPlacement: boolean;
    customPatch: boolean;
    playerNameAddon: boolean;
    playerNumberAddon: boolean;
  };
}

export interface TeamBuilderState {
  currentStep: number;
  sport: SportType | null;
  product: ProductType | null;
  individualSelections: {
    jersey: ProductType | null;
    shorts: ProductType | null;
    socks: ProductType | null;
  };
  orderMode: 'kit' | 'individual' | null;
  styleConfig: StyleConfig;
  designConfig: DesignConfig;
  roster: RosterEntry[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  needByDate: string;
  specialInstructions: string;
  deliveryOption: 'standard' | 'rush';
  proofFirst: boolean;
  orderApproved: boolean;
  revisionCount: number;
}

type TeamBuilderAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'SET_SPORT'; sport: SportType }
  | { type: 'SET_PRODUCT'; product: ProductType }
  | { type: 'SET_ORDER_MODE'; mode: 'kit' | 'individual' }
  | { type: 'SET_INDIVIDUAL_SELECTION'; itemType: 'jersey' | 'shorts' | 'socks'; product: ProductType }
  | { type: 'SET_STYLE_CONFIG'; config: Partial<StyleConfig> }
  | { type: 'SET_DESIGN_CONFIG'; config: Partial<DesignConfig> }
  | { type: 'ADD_ROSTER_ENTRY'; entry: RosterEntry }
  | { type: 'UPDATE_ROSTER_ENTRY'; id: string; entry: Partial<RosterEntry> }
  | { type: 'DELETE_ROSTER_ENTRY'; id: string }
  | { type: 'SET_ROSTER'; roster: RosterEntry[] }
  | { type: 'SET_SHIPPING_ADDRESS'; address: TeamBuilderState['shippingAddress'] }
  | { type: 'SET_BILLING_ADDRESS'; address: TeamBuilderState['billingAddress'] }
  | { type: 'SET_NEED_BY_DATE'; date: string }
  | { type: 'SET_SPECIAL_INSTRUCTIONS'; instructions: string }
  | { type: 'SET_DELIVERY_OPTION'; option: 'standard' | 'rush' }
  | { type: 'SET_PROOF_FIRST'; proofFirst: boolean }
  | { type: 'SET_ORDER_APPROVED'; approved: boolean }
  | { type: 'INCREMENT_REVISION' }
  | { type: 'LOAD_STATE'; state: TeamBuilderState }
  | { type: 'RESET' };

const initialState: TeamBuilderState = {
  currentStep: 0,
  sport: null,
  product: null,
  individualSelections: { jersey: null, shorts: null, socks: null },
  orderMode: null,
  styleConfig: {
    gender: 'Unisex',
    fit: 'Athletic',
    sleeve: 'Short',
    collar: 'V-Neck',
    fabric: 'Pro Mesh',
    addOns: {
      logoPlacement: false,
      sublimatedLogo: false,
      embroideryLogo: false,
      sponsorPlacement: false,
      customPatch: false,
      playerNameAddon: false,
      playerNumberAddon: false,
    },
  },
  designConfig: {
    selectedTemplateId: null,
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    accentColor: '#808080',
    pattern: 'solid',
    logos: [],
    teamName: '',
    teamNameFont: 'athletic',
    teamNameColor: '#FFFFFF',
    teamNamePlacement: 'center_chest',
    frontNumber: false,
    backNumber: true,
    numberFont: 'athletic',
    numberSize: 'large',
    numberOutline: true,
    playerNameFont: 'athletic',
    playerNameUppercase: true,
    playerNamePlacement: 'back_top',
  },
  roster: [],
  shippingAddress: {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  },
  billingAddress: {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  },
  needByDate: '',
  specialInstructions: '',
  deliveryOption: 'standard',
  proofFirst: false,
  orderApproved: false,
  revisionCount: 0,
};

function teamBuilderReducer(state: TeamBuilderState, action: TeamBuilderAction): TeamBuilderState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'SET_SPORT':
      // Step 0 → Step 1 (Product)
      return { ...state, sport: action.sport, product: null, individualSelections: { jersey: null, shorts: null, socks: null }, orderMode: null, currentStep: 1 };
    case 'SET_PRODUCT':
      // Step 1 → Step 2 (Design) — used for full kit selection
      return { ...state, product: action.product, currentStep: 2 };
    case 'SET_ORDER_MODE':
      return { ...state, orderMode: action.mode };
    case 'SET_INDIVIDUAL_SELECTION':
      return {
        ...state,
        individualSelections: { ...state.individualSelections, [action.itemType]: action.product },
      };
    case 'SET_STYLE_CONFIG':
      return { ...state, styleConfig: { ...state.styleConfig, ...action.config } };
    case 'SET_DESIGN_CONFIG':
      return { ...state, designConfig: { ...state.designConfig, ...action.config } };
    case 'ADD_ROSTER_ENTRY':
      return { ...state, roster: [...state.roster, action.entry] };
    case 'UPDATE_ROSTER_ENTRY':
      return {
        ...state,
        roster: state.roster.map(entry =>
          entry.id === action.id ? { ...entry, ...action.entry } : entry
        ),
      };
    case 'DELETE_ROSTER_ENTRY':
      return { ...state, roster: state.roster.filter(entry => entry.id !== action.id) };
    case 'SET_ROSTER':
      return { ...state, roster: action.roster };
    case 'SET_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.address };
    case 'SET_BILLING_ADDRESS':
      return { ...state, billingAddress: action.address };
    case 'SET_NEED_BY_DATE':
      return { ...state, needByDate: action.date };
    case 'SET_SPECIAL_INSTRUCTIONS':
      return { ...state, specialInstructions: action.instructions };
    case 'SET_DELIVERY_OPTION':
      return { ...state, deliveryOption: action.option };
    case 'SET_PROOF_FIRST':
      return { ...state, proofFirst: action.proofFirst };
    case 'SET_ORDER_APPROVED':
      return { ...state, orderApproved: action.approved };
    case 'INCREMENT_REVISION':
      return { ...state, revisionCount: state.revisionCount + 1, orderApproved: false };
    case 'LOAD_STATE':
      return { ...action.state };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface TeamBuilderContextType {
  state: TeamBuilderState;
  dispatch: React.Dispatch<TeamBuilderAction>;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  calculateTotal: () => {
    unitPrice: number;
    quantity: number;
    subtotal: number;
    addOnFees: number;
    rushFee: number;
    estimatedShipping: number;
    estimatedTax: number;
    total: number;
  };
}

const TeamBuilderContext = createContext<TeamBuilderContextType | undefined>(undefined);

export function TeamBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(teamBuilderReducer, initialState);

  const goToStep = (step: number) => {
    dispatch({ type: 'SET_STEP', step });
  };

  const nextStep = () => {
    dispatch({ type: 'SET_STEP', step: Math.min(state.currentStep + 1, 6) });
  };

  const prevStep = () => {
    dispatch({ type: 'SET_STEP', step: Math.max(state.currentStep - 1, 0) });
  };

  const calculateTotal = () => {
    const basePrice = state.product?.basePrice || 0;
    const quantity = state.roster.reduce((sum, entry) => sum + entry.quantity, 0);
    
    // Calculate add-on fees
    let addOnFees = 0;
    if (state.styleConfig.addOns.logoPlacement) addOnFees += 5 * quantity;
    if (state.styleConfig.addOns.sublimatedLogo) addOnFees += 3 * quantity;
    if (state.styleConfig.addOns.embroideryLogo) addOnFees += 7 * quantity;
    if (state.styleConfig.addOns.sponsorPlacement) addOnFees += 8 * quantity;
    if (state.styleConfig.addOns.customPatch) addOnFees += 10 * quantity;
    if (state.styleConfig.addOns.playerNameAddon) addOnFees += 3 * quantity;
    if (state.styleConfig.addOns.playerNumberAddon) addOnFees += 3 * quantity;

    const subtotal = basePrice * quantity;
    
    // Rush fee (20% extra)
    const rushFee = state.deliveryOption === 'rush' ? subtotal * 0.2 : 0;
    
    // Bulk discount (10% off for 20+ items, 15% for 50+)
    let discount = 0;
    if (quantity >= 50) discount = 0.15;
    else if (quantity >= 20) discount = 0.10;
    
    const discountedSubtotal = subtotal * (1 - discount);
    
    // Estimated shipping ($5 per item, min $25, max $150)
    const estimatedShipping = quantity > 0 ? Math.min(Math.max(quantity * 5, 25), 150) : 0;
    
    // Estimated tax (8% — standard sales tax estimate)
    const estimatedTax = (discountedSubtotal + addOnFees + rushFee) * 0.08;
    
    const total = discountedSubtotal + addOnFees + rushFee + estimatedShipping + estimatedTax;

    return {
      unitPrice: basePrice,
      quantity,
      subtotal: discountedSubtotal,
      addOnFees,
      rushFee,
      estimatedShipping,
      estimatedTax,
      total,
    };
  };

  return (
    <TeamBuilderContext.Provider value={{ state, dispatch, goToStep, nextStep, prevStep, calculateTotal }}>
      {children}
    </TeamBuilderContext.Provider>
  );
}

export function useTeamBuilder() {
  const context = useContext(TeamBuilderContext);
  if (context === undefined) {
    throw new Error('useTeamBuilder must be used within a TeamBuilderProvider');
  }
  return context;
}
