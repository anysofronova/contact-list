import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Form } from "../../components";
import { InputsType } from "../../@types";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../redux/slices/authSlice";

export const SignIn = () => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const singIn = ({ email, password }: InputsType) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user: { email, uid } }) => {
        dispatch(
          setUser({
            email,
            uid,
          })
        );
        setError(false);
        navigate("/home");
      })
      .catch(() => setError(true));
  };

  return (
    <Form
      title={"Sign in"}
      isSignUp={false}
      buttonText={"Sign in"}
      singInAndUp={singIn}
      error={error}
    />
  );
};
