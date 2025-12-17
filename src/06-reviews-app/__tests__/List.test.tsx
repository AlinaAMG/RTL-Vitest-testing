import { render, screen } from '@testing-library/react';
import List from '../List';
import { type Review } from '../Sandbox';

const mockReviews: Review[] = [
  {
    email: 'test@example.com',
    rating: '4',
    text: 'Very nice Product!!',
  },
  {
    email: 'user@example.com',
    rating: '5',
    text: 'Excellent Service!!',
  },
];

describe('List Component', () => {
  test('renders heading', () => {
    render(<List reviews={[]} />);
    expect(
      screen.getByRole('heading', { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  test('displays "No reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });

  test('renders reviews correctly when provided', () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = '⭐'.repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
