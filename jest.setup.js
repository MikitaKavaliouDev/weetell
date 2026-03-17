import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock AudioContext
class MockAudioContext {
  createOscillator() {
    return {
      connect: () => {},
      start: () => {},
      stop: () => {},
      type: 'sine',
      frequency: { setValueAtTime: () => {} },
    }
  }
  createGain() {
    return {
      connect: () => {},
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
    }
  }
  get destination() {
    return {}
  }
  get currentTime() {
    return 0
  }
}

Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: MockAudioContext,
})

// Mock speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    cancel: () => {},
    speak: () => {},
    getVoices: () => [],
    speaking: false,
    pending: false,
    onvoiceschanged: null,
  },
})

// Mock SpeechSynthesisUtterance
function MockSpeechSynthesisUtterance(text) {
  this.text = text
  this.lang = 'en'
  this.rate = 1
  this.pitch = 1
  this.voice = null
}

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  writable: true,
  value: MockSpeechSynthesisUtterance,
})

// Mock localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Suppress console errors/warnings during tests
const originalError = console.error
const originalWarn = console.warn

beforeEach(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') || args[0].includes('React does not recognize'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('DOMHelper')) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterEach(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image - Fix for React 19 boolean attribute warnings
jest.mock('next/image', () => {
  const MockImage = (props) => {
    // This is a test mock - using img instead of Next Image component
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" {...props} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock lucide-react - Ensures icons render as components with accessible names
jest.mock('lucide-react', () => {
  const createIconMock = (name) => {
    const IconMock = (props) => (
      <div data-testid={`icon-${name}`} role="img" aria-label={name} {...props} />
    );
    IconMock.displayName = `Mock${name}`;
    return IconMock;
  };
  
  return {
    __esModule: true,
    Play: createIconMock('Play'),
    Pause: createIconMock('Pause'),
    Volume2: createIconMock('Volume'),
    VolumeX: createIconMock('Volume'),
    Maximize: createIconMock('Maximize'),
    Captions: createIconMock('Captions'),
    X: createIconMock('Close'),
    Smartphone: createIconMock('Smartphone'),
    Copy: createIconMock('Copy'),
    Check: createIconMock('Check'),
    Clock: createIconMock('Clock'),
    AlertTriangle: createIconMock('Alert'),
    Siren: createIconMock('Siren'),
    MapPin: createIconMock('Location'),
    Stethoscope: createIconMock('Doctor'),
    Home: createIconMock('Home'),
    GraduationCap: createIconMock('Education'),
    Settings: createIconMock('Settings'),
    Thermometer: createIconMock('Thermometer'),
    Rotate3D: createIconMock('Rotate'),
    Crosshair: createIconMock('Crosshair'),
    ArrowRight: createIconMock('Arrow Right'),
    ChevronLeft: createIconMock('Previous'),
    ChevronRight: createIconMock('Next'),
    ArrowLeft: createIconMock('Back'),
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    span: 'span',
    path: 'path',
    svg: 'svg',
    circle: 'circle',
    rect: 'rect',
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
  }),
  useInView: () => false,
  useMotionValue: () => ({
    get: () => 0,
    set: jest.fn(),
  }),
  useTransform: () => 0,
  createMotionComponent: () => 'div',
}))

// Mock qrcode.react
jest.mock('qrcode.react', () => ({
  QRCodeSVG: () => null,
  QRCodeCanvas: () => null,
}))
