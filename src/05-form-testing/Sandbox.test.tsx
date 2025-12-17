import { render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';
import userEvent, { UserEvent } from '@testing-library/user-event';

const getFormElements = () => {
  const elements = {
    emailInput: screen.getByRole('textbox', { name: /email/i }),
    passwordInput: screen.getByLabelText('Password'),
    confirmPasswordInput: screen.getByLabelText(/confirm password/i),
    submitButton: screen.getByRole('button', { name: /submit/i }),
  };
  return elements;
};

describe('05-form-testing', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  test('inputs should be initially empty', () => {
    //    const {container} = render(<Sandbox/>)
    //     screen.debug();
    //     logRoles(container);

    const { emailInput, passwordInput, confirmPasswordInput } =
      getFormElements();
    // const emailInputElement = screen.getByLabelText("Email Address");
    expect(emailInput).toHaveValue('');

    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  });

  test('should be able to type in the input', async () => {
    const { emailInput, passwordInput, confirmPasswordInput } =
      getFormElements();

    await user.type(emailInput, 'test@test.com');
    expect(emailInput).toHaveValue('test@test.com');

    await user.type(passwordInput, 'secret');
    expect(passwordInput).toHaveValue('secret');

    await user.type(confirmPasswordInput, 'secret');
    expect(confirmPasswordInput).toHaveValue('secret');
  });

  test('should show email error if email is invalid', async () => {
    const { emailInput, submitButton } = getFormElements();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    await user.type(emailInput, 'invalid');
    await user.click(submitButton);

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
  test('should show password error if password is less than 5 characters', async () => {
    const { emailInput, submitButton, passwordInput } = getFormElements();
    expect(
      screen.queryByText(/Password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'abcd');
    await user.click(submitButton);

    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  test('should show  error if passwords do not match', async () => {
    const { emailInput, submitButton, passwordInput, confirmPasswordInput } =
      getFormElements();

    const errorMsg = /passwords do not match/i;

    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'secret');
    await user.type(confirmPasswordInput, 'notsecret');
    await user.click(submitButton);

    // expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  test('valid inputs show no errors and clear fields', async () => {
    const { emailInput, submitButton, passwordInput, confirmPasswordInput } =
      getFormElements();

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'secret');
    await user.type(confirmPasswordInput, 'secret');
    await user.click(submitButton);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must to be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords doe not match/i)
    ).not.toBeInTheDocument();

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  });
});
