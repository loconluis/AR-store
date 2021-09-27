import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import { SINGLE_PRODUCT_QUERY, UPDATE_PRODUCT_MUTATION } from '../queries';

const UpdateProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const [inputs, handleChange, , clearForm] = useForm(data?.Product);
  const [
    updateProduct,
    { error: _errorUpdate, loading: loadingUpdate },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
    });
    // clearForm();
    // Router.push({
    //   pathname: `/product/${res.data?.updateProduct.id}`,
    // });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <FormStyles onSubmit={handleSubmit}>
      <DisplayError error={error || _errorUpdate} />
      <fieldset disabled={loadingUpdate} aria-busy={loadingUpdate}>
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
export default UpdateProduct;
