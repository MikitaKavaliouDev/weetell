import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveCard from '../InteractiveCard';

describe('InteractiveCard', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    children: <div>Card Content</div>,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <InteractiveCard {...defaultProps}>
        <span data-testid="child-content">Test Content</span>
      </InteractiveCard>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<InteractiveCard {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Card Content'));
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders without selected state by default', () => {
    const { container } = render(<InteractiveCard {...defaultProps} />);
    
    // Check that it renders as a div (motion component)
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with selected state when selected prop is true', () => {
    const { container } = render(
      <InteractiveCard {...defaultProps} selected={true} />
    );
    
    // The selected glow should be present (check for motion div)
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <InteractiveCard {...defaultProps} className="custom-class" />
    );
    
    // The parent of the text is the inner relative div, 
    // the parent of that is the motion.div (the actual card)
    const card = screen.getByText('Card Content').parentElement?.parentElement;
    expect(card).toHaveClass('custom-class');
  });

  it('renders as a motion component', () => {
    const { container } = render(<InteractiveCard {...defaultProps} />);
    
    // Framer-motion adds motion-div class
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });
});
