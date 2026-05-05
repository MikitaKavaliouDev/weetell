import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../page';
import { useAssessmentStore } from '@/stores/useAssessmentStore';
import * as audio from '@/lib/audio';

jest.mock('@/lib/audio', () => ({
  audioManager: {
    setEnabled: jest.fn(),
    playSound: jest.fn(),
    narrate: jest.fn(),
  },
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('HomePage (Globe/Language Selection)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({ locale: 'en' });
  });

  it('renders the world globe image', () => {
    render(<HomePage />);

    expect(screen.getByAltText('World')).toBeInTheDocument();
  });

  it('renders all language flag bubbles', () => {
    render(<HomePage />);

    expect(screen.getByAltText('English')).toBeInTheDocument();
    expect(screen.getByAltText('Deutsch')).toBeInTheDocument();
    expect(screen.getByAltText('Español')).toBeInTheDocument();
    expect(screen.getByAltText('Türkçe')).toBeInTheDocument();
    expect(screen.getByAltText('French')).toBeInTheDocument();
  });

  it('navigates to disclaimer and plays click sound on English flag click', () => {
    render(<HomePage />);

    const englishFlag = screen.getByAltText('English');
    fireEvent.click(englishFlag);

    expect(audio.audioManager.playSound).toHaveBeenCalledWith('click');
    expect(mockPush).toHaveBeenCalledWith('/disclaimer');
  });

  it('sets locale when clicking a flag', () => {
    render(<HomePage />);

    const germanFlag = screen.getByAltText('Deutsch');
    fireEvent.click(germanFlag);

    expect(useAssessmentStore.getState().locale).toBe('de');
  });

  it('navigates to disclaimer on any flag click', () => {
    render(<HomePage />);

    const frenchFlag = screen.getByAltText('French');
    fireEvent.click(frenchFlag);

    expect(mockPush).toHaveBeenCalledWith('/disclaimer');
  });
});
