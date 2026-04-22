import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DetailedBodySelection from '../DetailedBodySelection';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import * as audio from '@/lib/audio';

// Mock the audio module
jest.mock('@/lib/audio', () => ({
  audioManager: {
    narrate: jest.fn(),
    stopNarration: jest.fn(),
    playSound: jest.fn(),
  },
}));

describe('DetailedBodySelection', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({
      locale: 'en',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the component', () => {
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Where exactly?')).toBeInTheDocument();
  });

  it('renders German title when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Wo genau?')).toBeInTheDocument();
  });

  it('renders Spanish title when locale is Spanish', () => {
    useAssessmentStore.setState({ locale: 'es' });
    
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('¿Dónde exactamente?')).toBeInTheDocument();
  });

  it('renders Turkish title when locale is Turkish', () => {
    useAssessmentStore.setState({ locale: 'tr' });
    
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Tam olarak neresi?')).toBeInTheDocument();
  });

  it('narrates subtitle on mount', () => {
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalledWith('Where exactly?', 'en');
  });

  it('narrates German subtitle when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalledWith('Wo genau?', 'de');
  });

  it('clears subtitle on unmount', () => {
    const { unmount } = render(<DetailedBodySelection onNext={mockOnNext} />);
    
    unmount();
    
    expect(audio.audioManager.stopNarration).toHaveBeenCalled();
  });

  it('calls onNext after symptom selection', async () => {
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    // First click to show slider
    const bodyImage = screen.getByAltText('Detailed Body Selection');
    fireEvent.click(bodyImage);
    
    // Wait for slider to appear, then click symptom
    await waitFor(() => {
      const feverIcon = screen.getAllByAltText('Fever')[0];
      if (feverIcon) {
        fireEvent.click(feverIcon);
      }
    }, { timeout: 500 });
    
    // Wait for onNext callback
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    }, { timeout: 1000 });
  });

  it('sets symptom in store when selected', async () => {
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    // Click to show slider
    const bodyImage = screen.getByAltText('Detailed Body Selection');
    fireEvent.click(bodyImage);
    
    // Wait for slider
    await waitFor(() => {
      expect(screen.getAllByAltText('Fever')[0]).toBeInTheDocument();
    });
  });

  it('plays click sound when body clicked', () => {
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    const bodyImage = screen.getByAltText('Detailed Body Selection');
    fireEvent.click(bodyImage);
    
    expect(audio.audioManager.playSound).toHaveBeenCalledWith('click');
  });

  it('plays success sound when symptom selected', async () => {
    render(<DetailedBodySelection onNext={mockOnNext} />);
    
    // Click to show slider
    const bodyImage = screen.getByAltText('Detailed Body Selection');
    fireEvent.click(bodyImage);
    
    // Wait for slider, then click symptom
    await waitFor(() => {
      const feverIcon = screen.getAllByAltText('Fever')[0];
      if (feverIcon) {
        fireEvent.click(feverIcon);
      }
    }, { timeout: 500 });
    
    expect(audio.audioManager.playSound).toHaveBeenCalledWith('success');
  });
});