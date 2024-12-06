import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../Components/firebase";

const useRegisterAuth = () => {
  // Initialize navigate inside the hook
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const checkPassword = (password, confirmPassword) =>
      password === confirmPassword;

    if (!checkPassword(password, confirmPassword)) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user info to Firestore
      await setDoc(doc(db, "user", user.uid), {
        id: user.uid,
        email,
        username: userName,
        tasks: [],
        points: 0,
      });

      console.log("User created:", user);
      navigate("/"); // Navigate after successful registration
    } catch (error) {
      console.error("Error during registration:", error.code, error.message);
      alert(error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    userName,
    setUsername,
    onSubmit,
  };
};

export default useRegisterAuth;
