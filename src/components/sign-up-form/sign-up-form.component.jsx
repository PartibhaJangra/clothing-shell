import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";
import { signUpStart } from "../../store/user/user.action.js";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // allows us to keep track of fields outside of form
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields; // used as values in <imput/>

  const dispatch = useDispatch();

  // clear input fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // we dont want default form behaviour

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    // we migth fail while calling firebase server
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("User already exists!");
      else {
        console.error("User creation encountered an error: " + error);
      }
    }
  };

  // updates form fields whenever something is entered
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value }); // remounts the component
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and passwoord</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName} // initial default value
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
