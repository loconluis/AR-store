import { ALL_PRODUCT_COUNT_QUERY } from '../queries';

const paginationField = () => ({
  keyArgs: false, // tells apollo we will take care of everything
  read(existing = [], { args, cache }) {
    const { skip, first } = args;

    // Read the number of items on the apge from the cache
    const data = cache.readQuery({ query: ALL_PRODUCT_COUNT_QUERY });
    console.log('data', data);
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);

    // Check if we have existing items
    const items = existing.slice(skip, skip + first).filter((x) => x);

    if (items.length && items.length !== first && page === pages) {
      return items;
    }

    if (items.length !== first) {
      // we dont have any items, we must go to the network for fetch them
      return false;
    }

    // if there are items, just return them from the cache, and we don't need to go to the network
    if (items.length) {
      console.log(
        `There are ${items.length} items in the cache! Gonna send them to apollo`
      );

      return items;
    }

    // First thing it does it ask the read function for those items
    // We cam either do one of two things
    // First things we can do is return the items because they are already in the cache
    // The other thing we can do is to return a flase from here {network request}
  },
  merge(existing, incoming, { args }) {
    const { skip, first } = args;
    // This runs when the Apollo Cluent comes back from the network with our product
    console.log(`Merging items from the network ${incoming.length}`);
    const merged = existing ? existing.slice(0) : [];
    // eslint-disable-next-line no-plusplus
    for (let i = skip; i < skip + incoming.length; i++) {
      merged[i] = incoming[i - skip];
    }

    console.log('merged', merged);

    return merged;
  },
});

export default paginationField;
