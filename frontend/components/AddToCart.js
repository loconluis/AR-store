import { useMutation } from '@apollo/client';
import { useCart } from '../lib/cartState';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../queries';

const AddToCart = ({ id }) => {
  const { openCart } = useCart();
  const [addToCart, { data, loading, error }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleAddToCart = async () => {
    await addToCart({
      variables: { id },
    });
    openCart();
  };
  return (
    <button disabled={loading} onClick={handleAddToCart} type="button">
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};

export default AddToCart;
