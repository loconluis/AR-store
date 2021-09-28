import { useMutation } from '@apollo/client';
import FormStyles from './styles/Form';
import DisplayedError from './ErrorMessage';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../queries';

const SigIn = () => {
  const [inputs, handleChange, resetForm] = useForm({
    email: '',
    password: '',
  });
  const [sigin, { error, loading, data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await sigin();
  };

  const _error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <FormStyles method="post" onSubmit={handleOnSubmit}>
      <h2>Sing into your account</h2>
      <DisplayedError error={error} />
      <fieldset>
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
        <button type="submit">Sign In!</button>
      </fieldset>
    </FormStyles>
  );
};

export default SigIn;
