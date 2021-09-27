import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { ALL_PRODUCTS_QUERY } from '../queries';
import { perPage } from '../config';

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error {error.message}</p>;
  }
  return (
    <div>
      <ProductsList>
        {data?.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsList>
    </div>
  );
};

export default Products;
