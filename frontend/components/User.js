import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../queries';

export const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
};
