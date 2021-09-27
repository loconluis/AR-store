import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import ProductsScreen from '../../components/Products';

const Products = () => {
  const router = useRouter();
  const page = parseInt(router?.query?.page) || 1;
  return (
    <div>
      <Pagination page={page} />
      <ProductsScreen page={page} />
      <Pagination page={page} />
    </div>
  );
};

export default Products;
