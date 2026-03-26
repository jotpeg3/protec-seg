/**
 * PROTECT SEG — Design System Colors
 * Primary: Navy Blue #000080
 * Secondary: White #FFFFFF
 * Accent: Emerald Green for trust/safety
 */

export const Colors = {
  // Primary Navy Blue Scale
  navy: {
    50: '#E6E6F0',
    100: '#B3B3D4',
    200: '#8080B8',
    300: '#4D4D9C',
    400: '#262690',
    500: '#000080', // Primary
    600: '#000070',
    700: '#000060',
    800: '#000050',
    900: '#000030',
    950: '#000020',
  },

  // Emerald Green (Safety/Trust)
  emerald: {
    50: '#E8F8F0',
    100: '#B8EBD4',
    200: '#88DEB8',
    300: '#58D19C',
    400: '#2BC480',
    500: '#00B864', // Primary Green
    600: '#00A458',
    700: '#008F4C',
    800: '#007A40',
    900: '#005C30',
  },

  // Red (Emergency/SOS)
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Primary Red
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Warning/Amber
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Neutral
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#0A0F1A',
  },

  // Semantic
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Dark theme palette
export const DarkTheme = {
  background: '#0A0B1A',
  surface: '#12132A',
  surfaceElevated: '#1A1B3A',
  card: '#16173A',
  border: '#2A2B4A',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B3C6',
    tertiary: '#6B6F8A',
    inverse: '#000080',
  },
  primary: Colors.navy[500],
  primaryLight: Colors.navy[400],
  accent: Colors.emerald[500],
  danger: Colors.danger[500],
  warning: Colors.warning[500],
};

// Light theme palette
export const LightTheme = {
  background: '#F0F2F8',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E2E4EE',
  text: {
    primary: '#000000',
    secondary: '#1F2937',
    tertiary: '#374151',
    inverse: '#FFFFFF',
  },
  primary: Colors.navy[500],
  primaryLight: Colors.navy[300],
  accent: Colors.emerald[500],
  danger: Colors.danger[500],
  warning: Colors.warning[500],
};
