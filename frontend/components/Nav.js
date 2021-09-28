import Link from 'next/link';
import SingOut from './SingOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SingOut />
        </>
      ) : (
        <Link href="/sigin">Sig In</Link>
      )}
    </NavStyles>
  );
};

export default Nav;
