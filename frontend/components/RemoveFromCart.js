import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { REMOVE_FROM_CART_MUTATION } from '../queries';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &::hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  });

  const handleRemoveFromCart = async () => {
    await removeFromCart();
  };

  return (
    <BigButton
      disabled={loading}
      type="button"
      title="Remove This item from Cart"
      onClick={handleRemoveFromCart}
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
