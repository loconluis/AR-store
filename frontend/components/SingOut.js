import { useMutation } from '@apollo/client';
import React from 'react';
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from '../queries';

const SingOut = () => {
  let x;
  const [signout, { data, loading, error }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const endSession = () => {
    signout();
  };
  return (
    <button onClick={endSession} type="button">
      Sign Out
    </button>
  );
};

export default SingOut;
