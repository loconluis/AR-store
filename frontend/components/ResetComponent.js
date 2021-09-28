import { useMutation } from '@apollo/client';
import FormStyles from './styles/Form';
import DisplayedError from './ErrorMessage';
import useForm from '../lib/useForm';
import { RESET_MUTATION } from '../queries';

const ResetComponent = ({ token }) => {
  const [inputs, handleChange, resetForm] = useForm({
    email: '',
    password: '',
  });
  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: { token, ...inputs },
  });

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('inputs', inputs);
      const res = await reset();
      resetForm();
    } catch (_e) {
      console.error(_e);
    }
  };

  const _error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  return (
    <FormStyles method="post" onSubmit={handleOnSubmit}>
      <h2>Sing Up For an Account</h2>
      <DisplayedError error={error || _error} />
      <fieldset>
        {data?.redeemUserPasswordResetToken && (
          <p>Success! You can now sign in!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            value={inputs.email}
            autoComplete="email"
            placeholder="Your Email Address"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            autoComplete="password"
          />
        </label>
        <button type="submit">Reset!</button>
      </fieldset>
    </FormStyles>
  );
};

export default ResetComponent;
