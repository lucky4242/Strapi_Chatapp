import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signInWithGoogle } = UserAuth();
  const [displayName, setDisplayName] = useState("");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  useEffect(() => {
    // Check if currentUser exists
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          // Destructure currentUser to get necessary details
          const { displayName, uid, email } = currentUser;

          // Update state with the user details
          setDisplayName(displayName);
          setUid(uid);
          setEmail(email);

          // Send user details to Strapi API
          await fetch("http://localhost:1337/api/accounts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                uid: uid,
                Username: displayName,
                Email: email,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Data from Strapi API:", data);
              // navigate to another page after sending data
              navigate("/Chat");
            })
            .catch((error) => {
              console.log("Error sending user data to Strapi API:", error);
            });
        } catch (error) {
          console.log("Error setting user data:", error);
        }
      };

      // Call fetchUserData function
      fetchUserData();
    }
  }, [currentUser, navigate]); // Include currentUser and navigate in the dependency array

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Strapi ChatRoom</h1>
          <p className="py-6">
            Join the conversation, meet new people, and make connections in one
            shared room.
          </p>
          <button onClick={handleLogin} className="btn btn-primary">
            LOGIN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
