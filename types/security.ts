// types/security.ts
export interface SecurityStatus {
    type: 'success' | 'warning' | 'error';
    text: string;
  }
  
  export interface SecurityOptionProps {
    icon: React.ComponentType<{ size: number; color: string }>;
    title: string;
    description: string;
    action?: string;
    status?: SecurityStatus;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }
  
  export interface HeaderProps {
    title: string;
    icon?: React.ComponentType<{ size: number; color: string }>;
    onBackPress?: () => void;
  }
  
  export interface PasswordInputProps {
    label: string;
    placeholder: string;
    show: boolean;
    onToggleShow: () => void;
    value: string;
    onChangeText: (text: string) => void;
    style?: any;
  }
  
  export interface SectionContainerProps {
    title: string;
    children: React.ReactNode;
    style?: any;
  }