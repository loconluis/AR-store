import useForm from '../lib/useForm';

const initialState = {
  name: 'Luis',
  price: 12,
  description: 'Hello',
};

const CreateProduct = () => {
  const [inputs, handleChange, resetForm, clearForm] = useForm(initialState);

  return (
    <form>
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
      <button type="button" onClick={resetForm}>
        Reset Form{' '}
      </button>
      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
    </form>
  );
};

export default CreateProduct;
