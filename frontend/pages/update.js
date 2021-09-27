import UpdateProduct from '../components/UpdateProduct';

const Update = ({ query: { id } }) => (
  <div>
    <UpdateProduct id={id} />
  </div>
);

export default Update;
