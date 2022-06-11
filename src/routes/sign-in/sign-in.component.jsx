import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);

    // console.log(user);
  };
  return (
    <div>
      <h1>This is signin page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Auth</button>
    </div>
  );
};

export default SignIn;
