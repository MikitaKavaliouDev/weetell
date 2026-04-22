import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ActionDecision from '../ActionDecision';
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

describe('ActionDecision', () => {
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
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText("What's the next step?")).toBeInTheDocument();
  });

  it('renders Wait & Monitor option', () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Wait & Monitor')).toBeInTheDocument();
  });

  it('renders See a Doctor option', () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('See a Doctor')).toBeInTheDocument();
  });

  it('renders German title when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Was möchten Sie tun?')).toBeInTheDocument();
  });

  it('renders Spanish title when locale is Spanish', () => {
    useAssessmentStore.setState({ locale: 'es' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('¿Cuál es el siguiente paso?')).toBeInTheDocument();
  });

  it('renders Turkish title when locale is Turkish', () => {
    useAssessmentStore.setState({ locale: 'tr' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Sonraki adım ne olacak?')).toBeInTheDocument();
  });

  it('renders German descriptions when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Abwarten & Beobachten')).toBeInTheDocument();
    expect(screen.getByText('Arzt aufsuchen')).toBeInTheDocument();
  });

  it('renders Spanish descriptions when locale is Spanish', () => {
    useAssessmentStore.setState({ locale: 'es' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Esperar y Monitorear')).toBeInTheDocument();
    expect(screen.getByText('Ver a un Médico')).toBeInTheDocument();
  });

  it('renders Turkish descriptions when locale is Turkish', () => {
    useAssessmentStore.setState({ locale: 'tr' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Bekle ve İzle')).toBeInTheDocument();
    expect(screen.getByText('Doktora Görün')).toBeInTheDocument();
  });

  it('narrates subtitle on mount', () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalledWith("What's the next step?", 'en');
  });

  it('narrates German subtitle when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalledWith('Was möchten Sie tun?', 'de');
  });

  it('clears subtitle on unmount', () => {
    const { unmount } = render(<ActionDecision onNext={mockOnNext} />);
    
    unmount();
    
    expect(audio.audioManager.stopNarration).toHaveBeenCalled();
  });

  it('sets actionDecision to wait when Wait & Monitor clicked', async () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    const waitButton = screen.getByText('Wait & Monitor');
    fireEvent.click(waitButton);
    
    await waitFor(() => {
      expect(useAssessmentStore.getState().actionDecision).toBe('wait');
    });
  });

  it('sets actionDecision to doctor when See a Doctor clicked', async () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    const doctorButton = screen.getByText('See a Doctor');
    fireEvent.click(doctorButton);
    
    await waitFor(() => {
      expect(useAssessmentStore.getState().actionDecision).toBe('doctor');
    });
  });

  it('calls onNext after selection', async () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    const waitButton = screen.getByText('Wait & Monitor');
    fireEvent.click(waitButton);
    
    // Wait for the timeout (300ms as per component)
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    }, { timeout: 500 });
  });

  it('plays success sound on selection', async () => {
    render(<ActionDecision onNext={mockOnNext} />);
    
    const doctorButton = screen.getByText('See a Doctor');
    fireEvent.click(doctorButton);
    
    await waitFor(() => {
      expect(audio.audioManager.playSound).toHaveBeenCalledWith('success');
    });
  });

  it('shows text labels when showTextLabels is true', () => {
    useAssessmentStore.setState({ showTextLabels: true });
    
    render(<ActionDecision onNext={mockOnNext} />);
    
    expect(screen.getByText('Home care instructions & video guide')).toBeInTheDocument();
  });

  it('hides text labels when showTextLabels is false', () => {
    useAssessmentStore.setState({ showTextLabels: false });
    
    const { container } = render(<ActionDecision onNext={mockOnNext} />);
    
    expect(container.textContent).not.toContain('Home care instructions');
  });
});