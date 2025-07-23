export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  subtext?: string;
  icon?: string;
  content?: string;
  tokens?: string[];
}

export interface OptionGroup {
  label: string;
  options: Option[];
  disabled?: boolean;
  maxOptions?: number;
}

export type OptionOrGroup = Option | OptionGroup;

export interface BootstrapSelectProps {
  // Core props
  options: OptionOrGroup[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  
  // Event handlers
  onShow?: () => void;
  onHide?: () => void;
  onRendered?: () => void;
  onRefreshed?: () => void;
  
  // Basic options
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  
  // Search functionality
  searchable?: boolean;
  searchPlaceholder?: string;
  searchStyle?: 'contains' | 'startsWith' | ((option: string, searchTerm: string) => boolean);
  searchNormalize?: boolean;
  
  // Limits
  maxOptions?: number;
  maxOptionsText?: string | ((numAll: number, numGroup: number) => string[]);
  
  // Display options
  showTick?: boolean;
  showSubtext?: boolean;
  showIcon?: boolean;
  showContent?: boolean;
  
  // Menu options
  size?: number | 'auto' | false;
  dropup?: boolean;
  dropupAuto?: boolean;
  actionsBox?: boolean;
  header?: string;
  
  // Text customization
  selectAllText?: string;
  deselectAllText?: string;
  noneSelectedText?: string;
  noneResultsText?: string;
  countSelectedText?: string;
  multipleSeparator?: string;
  
  // Styling
  className?: string;
  style?: string;
  styleBase?: string;
  width?: string | number;
  
  // Advanced options
  container?: string | HTMLElement;
  virtualScroll?: boolean | number;
  windowPadding?: number | number[];
  
  // Security
  sanitize?: boolean;
  sanitizeFn?: (domNodes: Node[]) => string;
  whiteList?: Record<string, string[]>;
  
  // HTML attributes
  id?: string;
  name?: string;
  required?: boolean;
  form?: string;
  
  // Additional props
  [key: string]: any;
}

export interface UseKeyboardNavigationProps {
  isOpen: boolean;
  options: Option[];
  onSelect: (value: string) => void;
  onClose: () => void;
}