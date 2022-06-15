// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const SignIn = () => {
  // everytime when redirect happens & app is mounted again this func get user auth using getRedirectResult()
  // useEffect(() => {
  //   (async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);

  //     if (response) {
  //       const resp = await createUserDocumentFromAuth(response.user);
  //     }
  //   })();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>This is signin page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
