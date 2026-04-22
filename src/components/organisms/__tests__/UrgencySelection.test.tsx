import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UrgencySelection from '../UrgencySelection';
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

describe('UrgencySelection', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({
      locale: 'en',
      ageGroup: 'child',
      bodyPart: 'head',
      symptom: 'fever',
      severity: 38.5,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the component', () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Recommended Level')).toBeInTheDocument();
  });

  it('renders urgency options (Routine, Urgent, Emergency)', () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Routine')).toBeInTheDocument();
  });

  it('renders with default severity', () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText(/Based on/)).toBeInTheDocument();
  });

  it('renders find doctor button', () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Find a Doctor')).toBeInTheDocument();
  });

  it('renders view map button', () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('View Map')).toBeInTheDocument();
  });

  it('renders German title when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Empfohlene Stufe')).toBeInTheDocument();
  });

  it('renders Spanish title when locale is Spanish', () => {
    useAssessmentStore.setState({ locale: 'es' });
    
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Nivel Recomendado')).toBeInTheDocument();
  });

  it('renders Turkish title when locale is Turkish', () => {
    useAssessmentStore.setState({ locale: 'tr' });
    
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(screen.getByText('Önerilen Seviye')).toBeInTheDocument();
  });

  it('narrates subtitle on mount', () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalled();
  });

  it('clears subtitle on unmount', () => {
    const { unmount } = render(<UrgencySelection onNext={mockOnNext} />);
    
    unmount();
    
    expect(audio.audioManager.stopNarration).toHaveBeenCalled();
  });

  it('calls onNext when proceed button clicked', async () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    const proceedButton = screen.getByText('Find a Doctor');
    fireEvent.click(proceedButton);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('plays success sound on proceed', async () => {
    render(<UrgencySelection onNext={mockOnNext} />);
    
    const proceedButton = screen.getByText('Find a Doctor');
    fireEvent.click(proceedButton);
    
    await waitFor(() => {
      expect(audio.audioManager.playSound).toHaveBeenCalledWith('success');
    });
  });

  it('handles routine urgency level (low fever)', () => {
    useAssessmentStore.setState({ severity: 37.0 });
    
    render(<UrgencySelection onNext={mockOnNext} />);
    
    // Should show routine level
    expect(screen.getByText('Routine')).toBeInTheDocument();
  });

  it('handles urgent urgency level (high fever)', () => {
    useAssessmentStore.setState({ severity: 40.0 });
    
    render(<UrgencySelection onNext={mockOnNext} />);
    
    // Should show urgent level
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  it('shows text labels when showTextLabels is true', () => {
    useAssessmentStore.setState({ showTextLabels: true });
    
    render(<UrgencySelection onNext={mockOnNext} />);
    
    // Should show description
    expect(screen.getByText('Schedule an appointment within 2-3 days')).toBeInTheDocument();
  });

  it('hides text labels when showTextLabels is false', () => {
    useAssessmentStore.setState({ showTextLabels: false });
    
    const { container } = render(<UrgencySelection onNext={mockOnNext} />);
    
    expect(container.textContent).not.toContain('Schedule an appointment');
  });
});