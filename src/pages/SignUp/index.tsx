import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { Form } from "../../components";
import { InputsType } from "../../@types";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../redux/slices/authSlice";

export const SignUp = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const signUp = ({ email, password }: InputsType) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user: { email, uid } }) => {
        dispatch(
          setUser({
            email,
            uid,
          })
        );
        navigate("/home");
      })
      .catch((error) => setError(error));
  };
  return (
    <Form
      title={"Create Your Account"}
      isSignUp={true}
      buttonText={"Sign Up"}
      singInAndUp={signUp}
      error={error}
    />
  );
};
