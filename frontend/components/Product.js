/* eslint-disable react/prop-types */
import Link from 'next/link';
import DeleteProduct from './DeleteProduct';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';

const Product = ({ product }) => (
  <ItemStyles>
    <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
    <Title>
      <Link href={`/products/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product.price)}</PriceTag>
    <p>{product.description}</p>
    {/* @TODO: Add buttons to edit and delete items */}
    <div className="buttonList">
      <Link
        href={{
          pathname: '/update',
          query: {
            id: product.id,
          },
        }}
      >
        Edit ✏️
      </Link>
      <AddToCart id={product.id} />
      <DeleteProduct id={product.id}>Delete ❌</DeleteProduct>
    </div>
  </ItemStyles>
);

export default Product;
