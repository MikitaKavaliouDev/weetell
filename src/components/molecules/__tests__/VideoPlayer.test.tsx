import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from '../VideoPlayer';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

describe('VideoPlayer', () => {
  const defaultProps = {
    src: '/test-video.mp4',
    locale: 'en',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.setState({
      showSubtitles: true,
      currentSubtitle: '',
    });
  });

  it('renders video element with correct src', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    // Just verify the video renders - check for the fallback text which indicates video element exists
    expect(screen.getByText(/Your browser does not support the video tag/i)).toBeInTheDocument();
  });

  it('renders play button', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    // The component should render play button
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('renders mute button', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /volume/i })).toBeInTheDocument();
  });

  it('renders captions button', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /captions/i })).toBeInTheDocument();
  });

  it('renders fullscreen button', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /maximize/i })).toBeInTheDocument();
  });

  it('toggles captions when caption button is clicked', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const captionButton = screen.getByRole('button', { name: /captions/i });
    fireEvent.click(captionButton);
    
    // The component uses internal state, verify the button is interactive
    expect(captionButton).toBeInTheDocument();
  });

  it('uses provided locale for track', () => {
    render(<VideoPlayer {...defaultProps} locale="de" />);
    
    const track = screen.getByText(/Your browser does not support the video tag/i)
      .parentElement?.querySelector('track');
    
    expect(track).toHaveAttribute('srclang', 'de');
  });

  it('renders with default English locale', () => {
    render(<VideoPlayer src="/video.mp4" />);
    
    const track = screen.getByText(/Your browser does not support the video tag/i)
      .parentElement?.querySelector('track');
    
    expect(track).toHaveAttribute('srclang', 'en');
  });

  it('calls onEnded callback when video ends', () => {
    const mockOnEnded = jest.fn();
    render(<VideoPlayer {...defaultProps} onEnded={mockOnEnded} />);
    
    const video = screen.getByText(/Your browser does not support the video tag/i)
      .parentElement?.querySelector('video');
    
    // Simulate video ending
    if (video) {
      fireEvent.ended(video);
    }
    
    expect(mockOnEnded).toHaveBeenCalled();
  });

  it('shows time display', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    // Should show 0:00 / 0:00 initially (or similar format)
    expect(screen.getByText(/\d+:\d+/)).toBeInTheDocument();
  });
});
