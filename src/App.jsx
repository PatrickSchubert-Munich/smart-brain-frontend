import "./App.css";
import { useState } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [route, setRoute] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [faceBox, setFaceBox] = useState({
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  });
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const { topRow, leftCol, rightCol, bottomRow } = data;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: leftCol * width,
      topRow: topRow * height,
      rightCol: width - rightCol * width,
      bottomRow: height - bottomRow * height,
    };
  };

  const displayFaceBox = (box) => {
    setFaceBox(box);
  };

  const onSubmit = () => {
    setimageUrl(input);
    fetch("http://localhost:3000/api/clarifai", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          displayFaceBox(calculateFaceLocation(response));
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json()) // Rückgabe von response.json()
            .then((entries) => {
              if (entries.length > 0) {
                setUser({ ...user, entries: entries[0] }); // Aktualisiere den Benutzer mit den neuen Einträgen
              } else {
                alert("Error updating entries");
              }
            })
            .catch((error) => {
              console.error("Error updating entries:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Clarifai API:", error);
      });
  };

  const loadUser = (data) => {
    setUser({ ...data });
  };

  const onChangeRoute = (route, event) => {
    event.preventDefault();
    if (route === "signout") {
      setIsSignedIn(false);
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <>
      <ParticlesBg
        className="particles"
        color="#fafafa"
        num={80}
        type="cobweb"
        bg={true}
      />
      <Navigation onChangeRoute={onChangeRoute} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          <Logo />
          <Rank name={user.name} rank={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition imageUrl={imageUrl} faceBox={faceBox} />
        </div>
      ) : route === "signin" ? (
        <Signin onChangeRoute={onChangeRoute} loadUser={loadUser} />
      ) : (
        <Register onChangeRoute={onChangeRoute} loadUser={loadUser} />
      )}
    </>
  );
}

export default App;
