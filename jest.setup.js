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

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = (props) => {
    return <img {...props} />
  }
  MockImage.displayName = 'MockImage'
  return MockImage
})

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