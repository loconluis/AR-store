/* eslint-disable no-restricted-globals */

import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT_MUTATION } from '../queries';

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    update,
  });

  const handleOnClick = (e) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteProduct({
        variables: { id },
      }).catch((err) => alert(err.message));
    }
  };
  return (
    <button disabled={loading} type="button" onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default DeleteProduct;
