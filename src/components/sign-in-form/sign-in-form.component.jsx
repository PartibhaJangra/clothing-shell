import { useState } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";
import FormInput from "../form-input/form-input.component.jsx";

import "./sign-in-form.styles.scss";
import Button from "../button/button.component.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // allows us to keep track of fields outside of form
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; // used as values in <imput/>

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // clear input fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // we dont want default form behaviour

    // we migth fail while calling firebase server
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
        case "auth/user-not-found":
          alert("no user associated with this user");
        default:
          console.error(error);
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
      <h2>Already have an account</h2>
      <span>Sign In with your email and passwoord</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
