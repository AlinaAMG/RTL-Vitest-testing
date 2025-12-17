import { render, screen, logRoles } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Form from '../Form';

export const getFormElements = () => {
  const elements = {
    emailInput: screen.getByRole('textbox', { name: /email/i }),
    ratingSelect: screen.getByRole('combobox', { name: /rating/i }),
    textArea: screen.getByRole('textbox', { name: /your review/i }),
    submitButton: screen.getByRole('button', { name: /submit review/i }),
  };
  return elements;
};

describe('Form Component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });
  test('renders form elements correctly', () => {
    const { container } = render(<Form onSubmit={mockOnSubmit} />);
    logRoles(container);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();
    expect(emailInput).toHaveValue('');
    expect(ratingSelect).toHaveValue('');
    expect(textArea).toHaveValue('');
    expect(submitButton).toBeInTheDocument();
  });

  test('show error message when review is too short', async () => {
    const user = userEvent.setup();
    const { container } = render(<Form onSubmit={mockOnSubmit} />);
    logRoles(container);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');

    await user.selectOptions(ratingSelect, '5');
    expect(ratingSelect).toHaveValue('5');

    await user.type(textArea, 'short');
    await user.click(submitButton);

    expect(screen.getByText(/Review must be at least 10 characters long/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const { container } = render(<Form onSubmit={mockOnSubmit} />);
    logRoles(container);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, 'test@example.com');
    await user.selectOptions(ratingSelect, '5');
    await user.type(
      textArea,
      'This is a valid review text that is long enough'
    );
    await user.click(submitButton);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: "test@example.com",
            rating: "5",
            text:"This is a valid review text that is long enough"
        });
  });
});
