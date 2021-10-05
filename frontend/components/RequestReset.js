import { useMutation } from '@apollo/client';
import FormStyles from './styles/Form';
import DisplayedError from './ErrorMessage';
import useForm from '../lib/useForm';
import { REQUEST_RESET_MUTATION } from '../queries';

const RequestReset = () => {
  const [inputs, handleChange, resetForm] = useForm({
    email: '',
  });
  const [signup, { error, loading, data }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      await signup();
    } catch (_e) {
      console.error(_e);
    }
  };

  return (
    <FormStyles method="post" onSubmit={handleOnSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayedError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a Link </p>
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </FormStyles>
  );
};

export default RequestReset;
