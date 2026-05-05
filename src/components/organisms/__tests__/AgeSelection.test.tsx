import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgeSelection from '../AgeSelection';
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

describe('AgeSelection', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({
      locale: 'en',
      showTextLabels: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders two age options', () => {
    render(<AgeSelection onNext={mockOnNext} />);
    
    expect(screen.getByAltText(/Baby 0-3 years/)).toBeInTheDocument();
    expect(screen.getByAltText(/Child 3-11 years/)).toBeInTheDocument();
  });

  it('calls onNext when baby is selected', async () => {
    render(<AgeSelection onNext={mockOnNext} />);
    
    // Click on the baby option (by alt text)
    const babyOption = screen.getByAltText(/Baby 0-3 years/).closest('div[class*="cursor-pointer"]');
    fireEvent.click(babyOption!);
    
    // Wait for the timeout to complete
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    }, { timeout: 500 });
  });

  it('calls onNext when child is selected', async () => {
    render(<AgeSelection onNext={mockOnNext} />);
    
    const childOption = screen.getByAltText(/Child 3-11 years/).closest('div[class*="cursor-pointer"]');
    fireEvent.click(childOption!);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    }, { timeout: 500 });
  });

  it('sets age group in store when selected', async () => {
    render(<AgeSelection onNext={mockOnNext} />);
    
    const babyOption = screen.getByAltText(/Baby 0-3 years/).closest('div[class*="cursor-pointer"]');
    fireEvent.click(babyOption!);
    
    await waitFor(() => {
      expect(useAssessmentStore.getState().ageGroup).toBe('baby');
    }, { timeout: 500 });
  });

  it('plays click sound on selection', async () => {
    render(<AgeSelection onNext={mockOnNext} />);
    
    const childOption = screen.getByAltText(/Child 3-11 years/).closest('div[class*="cursor-pointer"]');
    fireEvent.click(childOption!);
    
    await waitFor(() => {
      expect(audio.audioManager.playSound).toHaveBeenCalledWith('click');
    }, { timeout: 500 });
  });

  it('narrates subtitle on mount', () => {
    render(<AgeSelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalledWith('How old is the child?', 'en');
  });

  it('narrates German subtitle when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    
    render(<AgeSelection onNext={mockOnNext} />);
    
    expect(audio.audioManager.narrate).toHaveBeenCalledWith('Wie alt ist das Kind?', 'de');
  });

  it('shows text labels when showTextLabels is true', () => {
    useAssessmentStore.setState({ showTextLabels: true });
    
    render(<AgeSelection onNext={mockOnNext} />);
    
    expect(screen.getByText('0-3')).toBeInTheDocument();
    expect(screen.getByText('3-11')).toBeInTheDocument();
  });

  it('hides text labels when showTextLabels is false', () => {
    useAssessmentStore.setState({ showTextLabels: false });
    
    const { container } = render(<AgeSelection onNext={mockOnNext} />);
    
    expect(container.textContent).not.toContain('0-3');
    expect(container.textContent).not.toContain('3-11');
  });

  it('clears subtitle on unmount', () => {
    const { unmount } = render(<AgeSelection onNext={mockOnNext} />);
    
    unmount();
    
    expect(audio.audioManager.stopNarration).toHaveBeenCalled();
  });
});
