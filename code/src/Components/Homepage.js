import React, { useEffect, useState, useCallback } from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import star from "./../star.svg";
import { Button, Col, Row } from "react-bootstrap";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
import * as Separator from "@radix-ui/react-separator";
import "./../App.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Components/firebase';
import { db } from "./firebase";
import { doc, getDoc } from 'firebase/firestore';


function App({ points, setPoints }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add this helper function to check if a date is valid
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

   // Wrap fetchTasksFromFirestore in useCallback
   const fetchTasksFromFirestore = useCallback(async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No user is signed in");
        return;
      }

      const userDocRef = doc(db, "user", userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.tasks) {
          console.log('Raw tasks from Firestore:', userData.tasks);
          const processedTasks = userData.tasks
            .map(task => ({
              ...task,
              dueDate: new Date(task.dueDate)
            }))
            .filter(task => isValidDate(task.dueDate));

          console.log('Processed tasks:', processedTasks);
          setTasks(processedTasks);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []); // Empty dependency array because it doesn't depend on any props or state

  useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const email = user.email;
              // ...
              console.log("uid", uid)
              console.log("email", email)
              fetchUserData()
              fetchTasksFromFirestore();

            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
              navigate("/");
              
            }
          });

    },[fetchTasksFromFirestore, navigate]); // Include fetchTasksFromFirestore and navigate

        const getUserTasks = () => {
        try {
            let userId = null;

            // Wait for the authenticated user
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                userId = user.uid; // Get the user's UID


                    // Fetch Firestore document
              const userRef = doc(db, 'user', userId); // Reference to the user's document
              const userDoc = await getDoc(userRef);


              console.log(userDoc.data())
                
              } else {
                console.log('No user is signed in.');
              }
            });
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        }

        
        
        const fetchUserData = async () => {
          try {
            let userId = null;

            // Wait for the authenticated user
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                userId = user.uid; // Get the user's UID
                console.log('User ID:', userId);

                // Fetch Firestore document
                const userRef = doc(db, 'user', userId); // Reference to the user's document
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) { 
                  const data = userDoc.data();
                  setUserName(data.username) // Access the document data
                } else {
                  console.log('No such document!');
                }
              } else {
                console.log('No user is signed in.');
              }
            });
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        };


        const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
    <>
      <div className="App">
        <header className="App-header2"></header>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
          {/* Points Display */}
          <div
            className="points-display"
            style={{
              padding: '10px',
              backgroundColor: "white",
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            Points: {points} {/* Dynamically show points */}
          </div>
          <div className="App-buttons">
            <div>
              Hello {userName}
            </div> 
            
            <Button
              onClick={() => {
                navigate("/task");
              }}
              variant="neutral"
              size="small"
            >
              Tasks
            </Button>
            <Button
              onClick={handleLogout}
              variant="neutral"
              size="small"
            >
              Sign Out
            </Button>
          </div>
        </header>

        <h2>{}</h2>
        <div>
          <Col className="App-panel3">
            <div className="Column 1" style={{ width: "100%", height: "100%", border: "2px solid lightgray", borderRadius: "5px" }}>
              <img
                src={logo2}
                className="App-logo3"
                alt="logo"
                object-fit="fill"
              ></img>
            </div>
          </Col>
          <Col className="App-panel4"
          style={{
            border: "2px solid lightgray",
            borderRadius: "5px",
          }}>
            <div
              className="Column 2"
              style={{
                width: "100%",
                height: "100%",
                padding: "5%",
              }}
            >
              <p className="App-colHead">History</p>
              <Separator.Root
                className="SeparatorRoot"
                style={{ margin: "15px 0" }}
              />
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
              <p className="App-colBody">
                <img src={star} alt="star"></img> Task Complete
              </p>
              <p className="App-colBody2" style={{ paddingLeft: "8%" }}>
                {" "}
                Effect on avatar
              </p>
            </div>
          </Col>
          <Col>
            <Row className="App-panel5" style={{ height: "35%", border: "2px solid lightgray", borderRadius: "5px"}}>
              <div
                className="Column 3 Row 1"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "5%",
                }}
              >
                <p className="App-colHead">Avatar Details</p>
                <p className="App-colBody2">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Curae
                  amet nisl mattis phasellus pulvinar consectetur dignissim
                  eros. Eu curae erat malesuada massa auctor pulvinar egestas.
                </p>
                <p className="App-buttons2">
                  <Button
                    onClick={() => {
                      navigate("/avatar");
                    }}
                    variant="primary"
                    size="small"
                  >
                    Customize Avatar
                  </Button>
                </p>
              </div>
            </Row>
            <Row className="App-panel5" style={{ top: "50%", height: "35%", border: "2px solid lightgray", borderRadius: "5px" }}>
              <div
                className="Column 3 Row 1"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "5%",
                }}
              >
                <p className="App-colHead">Task Preview</p>
                <Separator.Root
                  className="SeparatorRoot"
                  style={{ margin: "15px 0" }}
                />
                {tasks.slice(0, 2).map((t) => (
              <div>
                <p
                  style={{
                    fontSize: "90%",
                    fontWeight: "600",
                    lineHeight: "50%",
                    paddingTop: "5%",
                  }}
                >
                  {t.title}
                </p>
                <p
                  style={{
                    fontSize: "80%",
                    fontWeight: "400",
                    lineHeight: "50%",
                    color: "gray",
                  }}
                >
                  Due: {t.dueDate.toLocaleString()}
                </p>
              </div>
            ))}
                <p>
                  <Button onClick={() => {getUserTasks()}} variant="primary" size="small">
                    Hide
                  </Button>
                </p>
              </div>
            </Row>
          </Col>
        </div>
      </div>
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default App;
