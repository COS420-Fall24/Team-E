import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "./Components/firebase";
import { doc, getDoc } from "firebase/firestore";
import Login from "./Components/Loginpage";
import HomePage from "./Components/Homepage";
import SignUp from "./Components/RegisterPage";
import TaskPage from "./Components/TaskPage";
import AvatarPage from "./Components/Avatarpage";

import "./App.css";

function App() {
  const [points, setPoints] = useState(0);
  // User inventory to keep track of purchased rewards
  const [userInventory, setUserInventory] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "user", user.uid));
        if (userDoc.exists() && userDoc.data().points !== undefined) {
          setPoints(userDoc.data().points);
        }
        if (userDoc.exists() && userDoc.data().userInventory !== undefined) {
          setUserInventory(userDoc.data().userInventory);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<HomePage points={points} setPoints={setPoints}/>} />
            <Route path="/task" element={<TaskPage points={points} setPoints={setPoints}/>} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/avatar" element={<AvatarPage points={points} setPoints={setPoints} userInventory={userInventory} setUserInventory={setUserInventory}/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
