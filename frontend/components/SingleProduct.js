import Head from 'next/head';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import { SINGLE_PRODUCT_QUERY } from '../queries';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidht);
  justify-content: center;
  align-items: top;
  gap: 20px;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading</p>;

  if (error) return <DisplayError error={error} />;

  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick-Fit | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
