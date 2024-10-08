"use client";
import React, { useEffect, useState } from "react";
import { CircularProgress, Modal } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FcGoogle } from "react-icons/fc";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openLoginModal } from "@/redux/slices/modalSlice";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/app/firebase";
import { signInUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

function SignUpModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  async function signInWithGoogle() {
    try {
      const userCredentials = await signInWithPopup(auth, provider);

      dispatch(
        signInUser({
          email: userCredentials.user.email,
          uid: userCredentials.user.uid,
          subscription: null,
        })
      );

      router.push("/dashboard");

      dispatch(closeSignUpModal());
    } catch (err) {
      console.log(`Error signing up: ${err}`);
      setError(`${err}`);
    }
  }

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      
      dispatch(
        signInUser({
          email: userCredentials.user.email,
          uid: userCredentials.user.uid,
          subscription: null,
        })
      );
      
      
      
      dispatch(closeSignUpModal());
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during sign up", error);
    } finally {
      setLoading(false);
    }
  }

  async function guestSignIn() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
      dispatch(closeSignUpModal());
      router.push('/dashboard');
    } catch (err) {
      setError(`${err}`);
      console.error(`Error signing in ${err}`);
    } finally {
      setLoading(false);
      router.push("/dashboard");
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        signInUser({
          email: currentUser.email,
          uid: currentUser.uid,
          subscription: null,
        })
      );
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={() => dispatch(closeSignUpModal())}>
        <div className="modal">
          <XMarkIcon
            className="modal__close"
            onClick={() => dispatch(closeSignUpModal())}
          />
          <h1 className="modal__title">Sign Up</h1>
          {error && <span className="modal__error">{error}</span>}
          <div className="modal__buttons">
            <button
              className="modal__button"
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle className="modal__button__icon" />
              <span className="modal__button__text">Login with Google</span>
            </button>
            <button className="modal__button" onClick={() => guestSignIn()}>
              <IoPerson className="modal__button__icon" />
              <span className="modal__button__text">Login as Guest</span>
            </button>
          </div>
          <div className="break">
            <div className="break__line"></div>
            <div className="break__or">or</div>
            <div className="break__line"></div>
          </div>
          <form className="modal__form">
            <div className="modal__form__field">
              <label className="modal__form__field__label">Email Address</label>
              <input
                type="email"
                className="modal__form__field__input"
                placeholder="your@email.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="modal__form__field">
              <label className="modal__form__field__label">Password</label>
              <input
                type="password"
                className="modal__form__field__input"
                placeholder="Your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              className="modal__form__submit"
              onClick={(event) => handleSignUp(event)}
            >
              {loading ? (
                <div className="spinner">
                  <CircularProgress
                    className="spinner__icon"
                    variant="determinate"
                    value={75}
                    sx={{ color: "white", fontSize: "12px" }}
                  />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="modal__bottom">
            <span className="modal__bottom__text">
              Already have an account?
            </span>
            <span
              className="modal__bottom__link"
              onClick={() => {
                dispatch(closeSignUpModal());
                dispatch(openLoginModal());
              }}
            >
              Log In
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SignUpModal;
