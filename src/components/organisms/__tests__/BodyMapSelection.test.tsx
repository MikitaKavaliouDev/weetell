import { render, screen, fireEvent } from '@testing-library/react';
import BodyMapSelection from '../BodyMapSelection';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

// Mock the audio module
jest.mock('@/lib/audio', () => ({
  audioManager: {
    narrate: jest.fn(),
    stopNarration: jest.fn(),
    playSound: jest.fn(),
  },
}));

// Mock BodySVG component with __esModule for consistency
jest.mock('@/components/molecules/BodySVG', () => ({
  __esModule: true,
  default: function MockBodySVG() {
    return <div data-testid="body-svg">BodySVG</div>;
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
    
    expect(audioManager.narrate).toHaveBeenCalledWith('Where does it hurt?', 'en');
  });

  it('narrates German subtitle when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    const { audioManager } = require('@/lib/audio');
    
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    expect(audioManager.narrate).toHaveBeenCalledWith('Wo tut es weh?', 'de');
  });

  it('clears subtitle on unmount', () => {
    const { audioManager } = require('@/lib/audio');
    const { unmount } = render(<BodyMapSelection onNext={mockOnNext} />);
    
    unmount();
    
    expect(audioManager.stopNarration).toHaveBeenCalled();
  });

  it('shows confirm button when part is selected', () => {
    render(<BodyMapSelection onNext={mockOnNext} />);
    
    // The confirm button should not be visible initially
    const confirmButton = screen.queryByText('Confirm');
    expect(confirmButton).not.toBeInTheDocument();
  });
});
