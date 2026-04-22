import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SplashPage from '../page';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import * as audio from '@/lib/audio';

jest.mock('@/lib/audio', () => ({
  audioManager: {
    setEnabled: jest.fn(),
    playSound: jest.fn(),
    narrate: jest.fn(),
  },
}));

describe('SplashPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({ locale: 'en' });
  });

  it('renders the logo', () => {
    render(<SplashPage />);
    
    expect(screen.getByAltText('Weetell')).toBeInTheDocument();
  });

  it('renders the disclaimer text in English', () => {
    render(<SplashPage />);
    
    expect(screen.getByText(/I understand this is a/i)).toBeInTheDocument();
  });

  it('renders the Continue button', () => {
    render(<SplashPage />);
    
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('renders audio on button', () => {
    render(<SplashPage />);
    
    expect(screen.getByAltText('Audio on')).toBeInTheDocument();
  });

  it('renders audio off button', () => {
    render(<SplashPage />);
    
    expect(screen.getByAltText('Audio off')).toBeInTheDocument();
  });

  it('Continue button is disabled initially', () => {
    render(<SplashPage />);
    
    const button = screen.getByText('Continue');
    expect(button).toBeDisabled();
  });

  it('enables Continue button after accepting disclaimer', () => {
    render(<SplashPage />);
    
    const checkboxArea = screen.getByText(/I understand this is a/i).closest('div');
    if (checkboxArea) {
      fireEvent.click(checkboxArea);
    }
    
    const button = screen.getByText('Continue');
    expect(button).not.toBeDisabled();
  });

  it('sets audio enabled when clicking audio on', () => {
    render(<SplashPage />);
    
    const audioOnButton = screen.getByAltText('Audio on');
    fireEvent.click(audioOnButton);
    
    expect(audio.audioManager.setEnabled).toHaveBeenCalledWith(true);
  });

  it('disables audio when clicking audio off', () => {
    render(<SplashPage />);
    
    const audioOffButton = screen.getByAltText('Audio off');
    fireEvent.click(audioOffButton);
    
    expect(audio.audioManager.setEnabled).toHaveBeenCalledWith(false);
  });

  it('plays click sound when toggling audio on', () => {
    render(<SplashPage />);
    
    const audioOnButton = screen.getByAltText('Audio on');
    fireEvent.click(audioOnButton);
    
    expect(audio.audioManager.playSound).toHaveBeenCalledWith('click');
  });

  it('narrates welcome message when starting', async () => {
    render(<SplashPage />);
    
    const checkboxArea = screen.getByText(/I understand this is a/i).closest('div');
    if (checkboxArea) {
      fireEvent.click(checkboxArea);
    }
    
    const button = screen.getByText('Continue');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(audio.audioManager.narrate).toHaveBeenCalledWith('Welcome to Weetell', 'en');
    });
  });

  it('renders German disclaimer when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    render(<SplashPage />);
    
    expect(screen.getByText(/nicht diagnostisches Bildungswerkzeug/i)).toBeInTheDocument();
  });

  it('renders German Continue button when locale is German', () => {
    useAssessmentStore.setState({ locale: 'de' });
    render(<SplashPage />);
    
    expect(screen.getByText('Weiter')).toBeInTheDocument();
  });

  it('renders Spanish disclaimer when locale is Spanish', () => {
    useAssessmentStore.setState({ locale: 'es' });
    render(<SplashPage />);
    
    expect(screen.getByText(/herramienta educativa no diagnóstica/i)).toBeInTheDocument();
  });

  it('renders Turkish disclaimer when locale is Turkish', () => {
    useAssessmentStore.setState({ locale: 'tr' });
    render(<SplashPage />);
    
    expect(screen.getByText(/eğitimsel bir araç/i)).toBeInTheDocument();
  });

  it('narrates German welcome when locale is German', async () => {
    useAssessmentStore.setState({ locale: 'de' });
    render(<SplashPage />);
    
    const checkboxArea = screen.getByText(/nicht diagnostisches/i).closest('div');
    if (checkboxArea) {
      fireEvent.click(checkboxArea);
    }
    
    const button = screen.getByText('Weiter');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(audio.audioManager.narrate).toHaveBeenCalledWith('Willkommen bei Weetell', 'de');
    });
  });
});