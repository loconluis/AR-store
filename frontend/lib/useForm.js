import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      value[0] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );

    setInputs(blankState);
  };

  return [inputs, handleChange, resetForm, clearForm];
};

export default useForm;
