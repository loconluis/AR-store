import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SingOut from './SingOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();
  const count = user?.cart.reduce((carry, item) => carry + item.quantity, 0);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SingOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount count={count} />
          </button>
        </>
      ) : (
        <Link href="/sigin">Sig In</Link>
      )}
    </NavStyles>
  );
};

export default Nav;
