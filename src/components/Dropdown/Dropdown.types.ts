import type { StyleProp, ViewStyle } from 'react-native';

export type DropdownVariant =
  | 'default'
  | 'hover'
  | 'disabled'
  | 'focused'
  | 'active'
  | 'captured'
  | 'captured_multi';

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type DropdownValue = string | string[] | null;

export interface DropdownProps {
  options: DropdownOption[];

  variant?: DropdownVariant;

  // Controlled and uncontrolled values
  value?: DropdownValue;
  defaultValue?: DropdownValue;

  // Behaviour
  multiple?: boolean;
  disabled?: boolean;
  searchable?: boolean;

  // UI configuration
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  maxVisibleTags?: number;
  maxDropdownHeight?: number;

  // Callbacks
  onChange?: (value: DropdownValue) => void;
  onOpen?: () => void;
  onClose?: () => void;

  // Styling
  containerStyle?: StyleProp<ViewStyle>;
  menuStyle?: StyleProp<ViewStyle>;

  accessibilityLabel?: string;
  testID?: string;
}