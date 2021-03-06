import { useMutation } from '@apollo/client';
import Router from 'next/router';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import { ALL_PRODUCTS_QUERY, CREATE_PRODUCT_MUTATION } from '../queries';

const initialState = {
  image: '',
  name: '',
  price: 0,
  description: '',
};

const CreateProduct = () => {
  const [inputs, handleChange, , clearForm] = useForm(initialState);
  const [_createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the inputs fields to the backend
    const res = await _createProduct();
    clearForm();
    Router.push({
      pathname: `/product/${res.data?.createProduct.id}`,
    });
  };

  return (
    <FormStyles onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            onChange={handleChange}
            type="file"
            name="image"
            id="image"
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            onChange={handleChange}
            type="number"
            name="price"
            id="price"
            placeholder="price"
            value={inputs.price}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            onChange={handleChange}
            name="description"
            id="description"
            placeholder="Write a description of the product"
            value={inputs.description}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </FormStyles>
  );
};

export default CreateProduct;
