// components/billing/types.ts
export interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  popular: boolean;
  accentColor: 'blue' | 'purple' | 'green';
}

export interface UsageItem {
  used: number;
  limit: number | 'Unlimited';
  unit?: string;
}

export interface Usage {
  repositories: UsageItem;
  storage: UsageItem & { unit: string };
  minutes: UsageItem & { unit: string };
}

export interface ThemeColors {
  background: {
    primary: string;
  };
  surface: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
  interactive: {
    primary: string;
  };
  status: {
    success: {
      main: string;
      light: string;
      text: string;
    };
    error: {
      main: string;
    };
    warning: {
      main: string;
    };
  };
  accents: {
    blue: {
      main: string;
      light: string;
    };
    purple: {
      main: string;
      light: string;
    };
    green: {
      main: string;
      light: string;
    };
  };
}