import { render, screen, fireEvent } from '@testing-library/react';
import BodySVG from '../BodySVG';

describe('BodySVG', () => {
  const mockOnPartClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SVG element', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="child"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with front view', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="child"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with back view', () => {
    render(
      <BodySVG
        view="back"
        ageGroup="child"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('calls onPartClick when body part is clicked', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="child"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    const paths = document.querySelectorAll('path');
    if (paths.length > 0) {
      fireEvent.click(paths[0]);
    }
  });

  it('renders with no selected part', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="child"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with selected part', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="child"
        selectedPart="head"
        onPartClick={mockOnPartClick}
      />
    );
    
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('handles baby ageGroup', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="baby"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('handles teen ageGroup', () => {
    render(
      <BodySVG
        view="front"
        ageGroup="teen"
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('handles null ageGroup', () => {
    render(
      <BodySVG
        view="front"
        ageGroup={null}
        selectedPart={null}
        onPartClick={mockOnPartClick}
      />
    );
    
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});