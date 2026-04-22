import { render, screen } from '@testing-library/react';
import SubtitleOverlay from '../SubtitleOverlay';
import { useAssessmentStore } from '@/stores/useAssessmentStore';

describe('SubtitleOverlay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAssessmentStore.getState().resetAssessment();
    useAssessmentStore.setState({
      showSubtitles: true,
      currentSubtitle: 'Test subtitle',
    });
  });

  it('renders when showSubtitles is true and subtitle exists', () => {
    useAssessmentStore.setState({ showSubtitles: true, currentSubtitle: 'Hello world' });
    
    render(<SubtitleOverlay />);
    
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('does not render when showSubtitles is false', () => {
    useAssessmentStore.setState({ showSubtitles: false, currentSubtitle: 'Hello world' });
    
    const { container } = render(<SubtitleOverlay />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when currentSubtitle is empty', () => {
    useAssessmentStore.setState({ showSubtitles: true, currentSubtitle: '' });
    
    const { container } = render(<SubtitleOverlay />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when both are false/empty', () => {
    useAssessmentStore.setState({ showSubtitles: false, currentSubtitle: '' });
    
    const { container } = render(<SubtitleOverlay />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders subtitle text correctly', () => {
    useAssessmentStore.setState({ showSubtitles: true, currentSubtitle: 'Select the body part' });
    
    render(<SubtitleOverlay />);
    
    expect(screen.getByText('Select the body part')).toBeInTheDocument();
  });

  it('renders German subtitle', () => {
    useAssessmentStore.setState({ showSubtitles: true, currentSubtitle: 'Wo tut es weh?' });
    
    render(<SubtitleOverlay />);
    
    expect(screen.getByText('Wo tut es weh?')).toBeInTheDocument();
  });

  it('renders Spanish subtitle', () => {
    useAssessmentStore.setState({ showSubtitles: true, currentSubtitle: '¿Dónde le duele?' });
    
    render(<SubtitleOverlay />);
    
    expect(screen.getByText('¿Dónde le duele?')).toBeInTheDocument();
  });

  it('renders Turkish subtitle', () => {
    useAssessmentStore.setState({ showSubtitles: true, currentSubtitle: 'Neresinde ağrıyor?' });
    
    render(<SubtitleOverlay />);
    
    expect(screen.getByText('Neresinde ağrıyor?')).toBeInTheDocument();
  });
});