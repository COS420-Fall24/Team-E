import React, {useState} from "react";
import logo from "./../logo.svg";
import logo2 from "./../logo2.svg";
import { Button, Col } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from '../Components/firebase';
import { db } from "./firebase";
//import { Link } from 'react-router-dom'; // might be useful later
import { useNavigate } from "react-router-dom";
import "./../App.css";
import { FaChevronDown } from "react-icons/fa";
import eyeblue from './AvatarOptions/eyeblue.png';
import eyegreen from './AvatarOptions/eyegreen.png';
import eyebrown from './AvatarOptions/eyebrown.png';
import skin1 from './AvatarOptions/skin1.png';
import skin2 from './AvatarOptions/skin2.png';
import skin3 from './AvatarOptions/skin3.png';
import flowers from './AvatarOptions/bgflowers.png';
import hearts from './AvatarOptions/bghearts.png';
import hairbrown from './AvatarOptions/hairbrown.png';


function AvatarPage({ points, setPoints, userInventory, setUserInventory}) {
  const navigate = useNavigate();

  // State to track which dropdown is currently visible (null = none visible)
  const [dropdownVisibleIndex, setDropdownVisibleIndex] = useState(null);

  // State to track selected options for each dropdown
  const [selectedOptions, setSelectedOptions] = useState(Array(6).fill("None"));


  //labels for each dropdown (order corresponds to dropdown buttons)
  const dropdownLabels = [
    "Background",
    "Skin Tone",
    "Eye Color",
    "Hair",
    "Hats",
    "Outfits",
  ];

  //dropdown menu options
  const dropdownOptions = [
    ["Hearts", "Flowers", "Pawprints", "None"],
    ["Fair", "Tan", "Dark", "None"],
    ["Blue", "Brown", "Green", "None"],
    ["Blonde", "Brown", "Black", "None"],
    ["Cat Ears", "Gnome Hat", "Tiara", "None"],
    ["Cat Onesie", "Overalls", "Princess Dress", "None"],
  ];

  const cosmeticRewards = [
    { id: "Cat Ears", cost: 50 },
    { id: "Princess Dress", cost: 100 },
  ];

  //these are where the options are like key valued to their picture name
  //the null ones mean the images have yet to be added
  const imageOptions = {
    "Background": {
      "Hearts": hearts,
      "Flowers": flowers,
      "Pawprints": null, 
      "None": null
    },
    "Skin Tone": {
      "Fair": skin1,
      "Tan": skin2,
      "Dark": skin3,
      "None": null
    },
    "Eye Color": {
      "Blue": eyeblue,
      "Brown": eyebrown,
      "Green": eyegreen,
      "None": null
    },
    "Hair": {
      "Blonde": null, 
      "Brown": hairbrown,
      "Black": null, 
      "None": null
    },
    "Hats": {
      "Cat Ears": null, 
      "Gnome Hat": null, 
      "Tiara": null, 
      "None": null
    },
    "Outfits": {
      "Cat Onesie": null, 
      "Overalls": null, 
      "Princess Dress": null, 
      "None": null
    }
  };

  // Toggles dropdown visibility for the selected index
  const toggleDropdown = (index) => {
    setDropdownVisibleIndex(dropdownVisibleIndex === index ? null : index);
  };

  // Sets the selected option for a specific dropdown and closes it
  const selectOption = (index, option) => {
    if (isLocked(option)) {
      handlePurchase(option); // Trigger purchase if locked
    } else {
      const newOptions = [...selectedOptions];
      newOptions[index] = option;
      setSelectedOptions(newOptions);
      setDropdownVisibleIndex(null);
    }
  };

  // Closes the dropdown when clicking outside of it
  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownVisibleIndex(null);
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  // Function to get the selected image based on dropdown selection
  const getSelectedImages = () => {
    return selectedOptions.map((option, index) => {
      const category = dropdownLabels[index];
      return imageOptions[category][option];
    }).filter(Boolean);
  };

  const selectedImages = getSelectedImages();

  //Function to check if reward is locked
  const isLocked = (option) => {
    return (
      Array.isArray(userInventory) &&
      !userInventory.includes(option) &&
      cosmeticRewards.some((r) => r.id === option)
    );
  };
  

  // Function to purchase rewards when clicking locked options
  const handlePurchase = async (option) => {
    const reward = cosmeticRewards.find((r) => r.id === option);
    if (reward) {
      if (points >= reward.cost) {
        const confirmPurchase = window.confirm(
          `This item costs ${reward.cost} points. Would you like to purchase it?`
        );
        if (confirmPurchase) {
          const newPoints = points - reward.cost;
          const newInventory = [...userInventory, reward.id];
          
          // Update points and inventory in state
          setPoints(newPoints);
          setUserInventory(newInventory);

          // Save updated inventory and points to Firestore
          try {
            const userDocRef = doc(db, "user", auth.currentUser.uid);
            await updateDoc(userDocRef, {
              points: newPoints,
              userInventory: newInventory,
            });
            alert(`${option} has been unlocked!`);
          } catch (error) {
            console.error("Error updating Firestore: ", error);
            alert("There was an issue updating your inventory. Please try again.");
          }
        }
      } else {
        alert("Not enough points!");
      }
    }
  };



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
            {/* Button to navigate to the homepage*/}
            <Button
              onClick={() => {
                navigate("/home");
              }}
              variant="neutral"
              size="small"
            >
              Home
            </Button>

            {/* Button to navigate to the task page*/}
            <Button
              onClick={() => {
                navigate("/task");
              }}
              variant="neutral"
              size="small"
            >
              Tasks
            </Button>

            {/* Button to sign out */}
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="neutral"
              size="small"
            >
              Sign Out
            </Button>
          </div>
          
        </header>
        <div>
          <div
            className="avatar-container"
            style={{
              display: "flex",
              alignItems: "stretch",
              position: "absolute",
              top: "15%",
              left: "5%",
              right: "5%",
              height: "70%",
              gap: "5%",
            }}
          >
            {/* Avatar Display column */}
            <Col
              className="avatarCol"
              style={{
                flex: "1",
                backgroundColor: "white",
                opacity: 0.8,
                border: "2px solid lightgray",
              }}
            >
              {/* Avatar Goes Here */}
              <div className="avatarPlaceHolder"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '30.5%',

                }}>
                  {/* This is where the options are mapped using the user selected choices*/}
                   {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="aghh"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 10 * (index + 1), 
                      width: "100%",
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    alt="avatar-option"
                  />
                ))}

              </div>
            </Col>

            {/* Column that holds all informaiton for the customize avatar box */}
            <Col
              className="customizeAvatar"
              style={{
                flex: "2", // takes double the space compared to the avatar display column
                backgroundColor: "white",
                opacity: 0.8,
                border: "2px solid lightgray",
                borderRadius: "10px",
                padding: "1em",
              }}
            >
              {/* Section Header */}
              <div
                className="avatarHeader"
                style={{
                  fontWeight: 700,
                  textAlign: "left",
                  height: "5%",
                  marginTop: "3%",
                  marginLeft: "3%",
                }}
              >
                <p>Customize Avatar</p>
              </div>

              {/* Section Subheader */}
              <div
                className="avatarSubheader"
                style={{
                  textAlign: "left",
                  marginTop: ".5em",
                  marginBottom: "5%",
                  marginLeft: "3%",
                  color: "dimgray",
                }}
              >
                Subheading
              </div>

              {/* Dropdown grid for Avatar Customization */}
              <div
                className="dropdown-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)", //estabishes 3 columns
                  gridGap: "2em",
                }}
              >
                {selectedOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown"
                    style={{
                      position: "relative",
                      padding: "10px",
                    }}
                  >
                    {/* Label for Each Dropdown */}
                    <p
                      style={{
                        marginBottom: "5px",
                        fontWeight: 300,
                        textAlign: "left",
                      }}
                    >
                      {dropdownLabels[index]}
                    </p>

                    {/* Actual Dropdown Button */}
                    <button
                      data-testid={`dropdown-button-${index}`}
                      className="dropbtn"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        color: "black",
                        padding: "5px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "1px solid dimgray",
                        width: "100%",
                        textAlign: "left",
                        marginBottom: "8%",
                      }}
                      onClick={() => toggleDropdown(index)}
                    >
                      {option}
                      <FaChevronDown />
                    </button>

                    {/* Content of the Dropdown Menus */}
                    {dropdownVisibleIndex === index && (
                      <div
                        className="dropdown-content"
                        style={{
                          position: "absolute",
                          top: "80%",
                          left: "5%",
                          backgroundColor: "white",
                          border: "1px solid dimgray",
                          borderRadius: "5px",
                          width: "90%",
                          zIndex: 10,
                          opacity: 0.8,
                          overflowY: "auto",
                          maxHeight: "60px",
                        }}
                      >
                        {dropdownOptions[index].map((opt, idx) => (
                          <p
                            key={idx}
                            style={{
                              padding: "5px",
                              margin: 0,
                              color: isLocked(opt) ? "red" : "black", // Highlight locked items
                              cursor: "pointer",
                            }}
                            onClick={() => selectOption(index, opt)}
                          >
                            {opt}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </div>
        </div>
      </div>
      {/* Bottom of the App */}
      <div className="App-bottom">
        <p>© F2024 - Ethernet, Inc. All rights reserved. Address Address</p>
      </div>
      <div className="App-background">{}</div>
    </>
  );
}

export default AvatarPage;
