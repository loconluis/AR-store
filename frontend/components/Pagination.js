import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';
import { ALL_PRODUCT_COUNT_QUERY } from '../queries';
import { perPage } from '../config';

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCT_COUNT_QUERY);
  const { count } = data?._allProductsMeta || 0;
  const pageCount = Math.ceil(count / perPage);

  if (loading) <p>Loading...</p>;

  if (error) <DisplayError error={error} />;

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>{'<- Prev'}</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p> {count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>{'Next ->'}</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
