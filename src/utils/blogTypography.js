// Blog Typography & Color Presets for Captive Events CMS

export const FONT_PRESETS = [
  {
    id: 'Inter',
    name: 'Inter',
    subtitle: 'Modern Clean Sans',
    family: "'Inter', sans-serif",
    category: 'Sans Serif',
  },
  {
    id: 'Outfit',
    name: 'Outfit',
    subtitle: 'Luxury Modern Display',
    family: "'Outfit', sans-serif",
    category: 'Display',
  },
  {
    id: 'Playfair Display',
    name: 'Playfair Display',
    subtitle: 'High-Fashion Editorial',
    family: "'Playfair Display', Georgia, serif",
    category: 'Editorial Serif',
  },
  {
    id: 'Cormorant Garamond',
    name: 'Cormorant Garamond',
    subtitle: 'Prestigious Classical',
    family: "'Cormorant Garamond', serif",
    category: 'Luxury Serif',
  },
  {
    id: 'Cinzel',
    name: 'Cinzel',
    subtitle: 'Royal Architectural',
    family: "'Cinzel', serif",
    category: 'Luxury Display',
  },
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans',
    subtitle: 'Crisp Contemporary',
    family: "'Plus Jakarta Sans', sans-serif",
    category: 'Geometric Sans',
  },
  {
    id: 'Poppins',
    name: 'Poppins',
    subtitle: 'Warm Geometric Sans',
    family: "'Poppins', sans-serif",
    category: 'Modern Sans',
  },
  {
    id: 'Montserrat',
    name: 'Montserrat',
    subtitle: 'Bold Architectural',
    family: "'Montserrat', sans-serif",
    category: 'Modern Sans',
  },
  {
    id: 'Merriweather',
    name: 'Merriweather',
    subtitle: 'Classic Literary',
    family: "'Merriweather', Georgia, serif",
    category: 'Reading Serif',
  },
  {
    id: 'Cairo',
    name: 'Cairo',
    subtitle: 'Dubai & Arabic Friendly',
    family: "'Cairo', sans-serif",
    category: 'Bilingual Sans',
  },
  {
    id: 'JetBrains Mono',
    name: 'JetBrains Mono',
    subtitle: 'Tech & Avant-Garde',
    family: "'JetBrains Mono', monospace",
    category: 'Monospace',
  },
];

export const COLOR_PRESETS = [
  { label: 'Pure White', value: '#ffffff' },
  { label: 'Platinum Gray', value: '#e5e7eb' },
  { label: 'Warm Ivory', value: '#fefae0' },
  { label: 'Slate Silver', value: '#94a3b8' },
  { label: 'Champagne Gold', value: '#d4af37' },
  { label: 'Captive Orange', value: '#ff8c00' },
  { label: 'Crimson Red', value: '#ff3b3b' },
  { label: 'Coral Rose', value: '#fb7185' },
  { label: 'Emerald Mint', value: '#34d399' },
  { label: 'Cyan Sky', value: '#38bdf8' },
  { label: 'Lavender Violet', value: '#c084fc' },
  { label: 'Neon Amber', value: '#facc15' },
];

export const ACCENT_COLOR_PRESETS = [
  { label: 'Captive Orange', value: '#ff8c00' },
  { label: 'Crimson Red', value: '#ff3b3b' },
  { label: 'Champagne Gold', value: '#d4af37' },
  { label: 'Emerald Jade', value: '#10b981' },
  { label: 'Electric Cyan', value: '#06b6d4' },
  { label: 'Royal Violet', value: '#8b5cf6' },
  { label: 'Pure White', value: '#ffffff' },
];

export const FONT_SIZE_MAP = {
  compact: {
    label: 'Compact',
    fontSize: '0.875rem', // 14px
    lineHeight: '1.6',
  },
  normal: {
    label: 'Standard',
    fontSize: '1rem', // 16px
    lineHeight: '1.75',
  },
  editorial: {
    label: 'Editorial',
    fontSize: '1.125rem', // 18px
    lineHeight: '1.8',
  },
  large: {
    label: 'Large Print',
    fontSize: '1.25rem', // 20px
    lineHeight: '1.85',
  },
};

// Dynamically load Google Font if not preloaded
export const loadGoogleFont = (fontName) => {
  if (!fontName || typeof document === 'undefined') return;
  const cleanName = fontName.trim().replace(/['"]/g, '');
  if (!cleanName || cleanName.toLowerCase() === 'system-ui' || cleanName.toLowerCase() === 'sans-serif' || cleanName.toLowerCase() === 'serif') {
    return;
  }
  const id = `dynamic-font-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  if (document.getElementById(id)) return;

  try {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanName)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap`;
    document.head.appendChild(link);
  } catch (err) {
    console.warn(`Could not load font ${fontName}:`, err);
  }
};

// Resolve CSS font-family string from font identifier
export const getResolvedFontFamily = (fontName) => {
  if (!fontName) return "'Inter', sans-serif";
  const preset = FONT_PRESETS.find(
    (f) => f.id.toLowerCase() === fontName.toLowerCase() || f.name.toLowerCase() === fontName.toLowerCase()
  );
  if (preset) return preset.family;
  // If user typed custom font name
  const clean = fontName.trim().replace(/['"]/g, '');
  return `'${clean}', sans-serif`;
};

// Format markdown inline text to HTML while preserving inline style tags
export const formatInlineHtml = (text = '') => {
  if (!text) return '';
  return text
    // Convert markdown bold **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700; color: inherit;">$1</strong>')
    // Convert markdown italic *text*
    .replace(/\*([^*\n]+)\*/g, '<em style="font-style: italic; color: inherit;">$1</em>')
    // Convert markdown links [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; opacity: 0.9; color: inherit;">$1</a>'
    );
};
