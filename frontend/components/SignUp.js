import { useMutation } from '@apollo/client';
import FormStyles from './styles/Form';
import DisplayedError from './ErrorMessage';
import useForm from '../lib/useForm';
import { SINGUP_MUTATION } from '../queries';

const SignUp = () => {
  const [inputs, handleChange, resetForm] = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { error, loading, data }] = useMutation(SINGUP_MUTATION, {
    variables: inputs,
  });

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await signup();
    } catch (_e) {
      console.error(_e);
    }
  };

  return (
    <FormStyles method="post" onSubmit={handleOnSubmit}>
      <h2>Sing Up For an Account</h2>
      <DisplayedError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data?.createUser.email} - Please Go Head and Sign
            In!{' '}
          </p>
        )}
        <label htmlFor="name">
          Your Name
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            value={inputs.name}
            autoComplete="name"
            placeholder="Your Name"
          />
        </label>
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </FormStyles>
  );
};

export default SignUp;
