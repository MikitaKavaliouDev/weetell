import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BodyMapSelection from '../BodyMapSelection';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

// Mock the audio module
jest.mock('@/lib/audio', () => ({
  audioManager: {
    narrate: jest.fn(),
    stopNarration: jest.fn(),
    playSound: jest.fn(),
    playLanguageAudio: jest.fn(),
  },
}));

// Mock BodySVG component with __esModule for consistency
jest.mock('@/components/molecules/BodySVG', () => ({
  __esModule: true,
  default: function MockBodySVG({ onPartClick }: { onPartClick: (id: string) => void }) {
    return (
      <div data-testid="body-svg">
        <button data-testid="head-part" onClick={() => onPartClick('head')}>Head</button>
      </div>
    );
  },
}));

describe('BodyMapSelection', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({
      locale: 'en',
      ageGroup: 'child',
    });
  });

  it('renders the component', () => {
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    expect(screen.getByTestId('body-svg')).toBeInTheDocument();
  });

  it('renders title in English', () => {
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Where does it hurt?')).toBeInTheDocument();
  });

  it('renders title in German when locale is de', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Wo tut es weh?')).toBeInTheDocument();
  });

  it('renders view toggle button', () => {
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Show Back')).toBeInTheDocument();
  });

  it('toggles view when button is clicked', () => {
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    const toggleButton = screen.getByText('Show Back');
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Show Front')).toBeInTheDocument();
  });

  it('narrates subtitle on mount', () => {
    const { audioManager } = require('@/lib/audio');
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    expect(audioManager.playLanguageAudio).toHaveBeenCalledWith('where_does_it_hurt', 'en');
  });

  it('calls onNext when part is selected', async () => {
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    const headPart = screen.getByTestId('head-part');
    fireEvent.click(headPart);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    }, { timeout: 1000 });
  });
});
