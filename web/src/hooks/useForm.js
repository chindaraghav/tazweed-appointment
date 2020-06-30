import { useState } from "react";

function useForm() {
  const [inputs, setInput] = useState({});

  const handleInputChange = (fieldName, value) => {
    setInput({ ...inputs, [fieldName]: value });
  };

  const resetForm = () => {
    setInput({});
  };

  return { inputs, handleInputChange, resetForm };
}

export default useForm;
