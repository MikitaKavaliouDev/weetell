import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SeveritySelection from '../SeveritySelection';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import * as audio from '@/lib/audio';

// Mock the audio module
jest.mock('@/lib/audio', () => ({
  audioManager: {
    narrate: jest.fn(),
    stopNarration: jest.fn(),
    playSound: jest.fn(),
    playLanguageAudio: jest.fn(),
  },
}));

// Mock child components - Using @/ alias for clarity
jest.mock('@/components/molecules/FeverChildSVG', () => ({
  __esModule: true,
  default: () => <div data-testid="fever-child">FeverChildSVG</div>,
}));

jest.mock('@/components/molecules/ThermometerSVG', () => ({
  __esModule: true,
  default: () => <div data-testid="thermometer">ThermometerSVG</div>,
}));

jest.mock('@/components/molecules/VideoPlayer', () => ({
  __esModule: true,
  default: () => <div data-testid="video-player">VideoPlayer</div>,
}));

// Mock symptom-graph
jest.mock('@/data/symptom-graph', () => ({
  getVideoForTemperature: jest.fn(() => '/videos/test.mp4'),
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('SeveritySelection', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({
      locale: 'en',
      ageGroup: 'child',
      bodyPart: 'head',
      symptom: 'fever',
    });
  });

  it('renders the component', () => {
    render(<SeveritySelection onNext={mockOnNext} />);
    
    expect(screen.getByAltText('Symptom illustration')).toBeInTheDocument();
  });

  it('renders play video, wait and doctor buttons', () => {
    render(<SeveritySelection onNext={mockOnNext} />);
    
    expect(screen.getByAltText('Play video')).toBeInTheDocument();
    expect(screen.getByAltText('Wait')).toBeInTheDocument();
    expect(screen.getByAltText('Nurse')).toBeInTheDocument();
  });

  it('renders play button for video', () => {
    render(<SeveritySelection onNext={mockOnNext} />);
    
    // The play button should exist (it's a button with Play icon, and image buttons)
    const playButtons = document.querySelectorAll('button');
    expect(playButtons.length).toBeGreaterThan(0);
  });

  it('narrates subtitle on mount', () => {
    render(<SeveritySelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.playLanguageAudio).toHaveBeenCalledWith('how_high_is_the_fever', 'en');
  });

  it('narrates German subtitle when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<SeveritySelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.playLanguageAudio).toHaveBeenCalledWith('how_high_is_the_fever', 'de');
  });

  it('clears subtitle on unmount', () => {
    const { unmount } = render(<SeveritySelection onNext={mockOnNext} />);
    
    unmount();
    
    expect(audio.audioManager.stopNarration).toHaveBeenCalled();
  });

  it('sets actionDecision and shows waiting room when doctor button clicked', async () => {
    render(<SeveritySelection onNext={mockOnNext} />);
    
    const doctorButton = screen.getByAltText('Nurse');
    fireEvent.click(doctorButton);
    
    await waitFor(() => {
      expect(useAssessmentStore.getState().actionDecision).toBe('doctor');
    });
    
    expect(screen.getByAltText('Go to bed')).toBeInTheDocument();
  });
});
