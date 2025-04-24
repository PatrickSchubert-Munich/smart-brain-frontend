import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, faceBox }) => {
  return (
    <div className="container">
      <div className="absolute">
        {imageUrl ? (
          <img
            id="inputImage"
            src={imageUrl}
            alt="Detected face"
            width="500px"
            height="auto"
          />
        ) : null}
        <div
          className="bounding-box"
          style={{
            top: faceBox.topRow,
            right: faceBox.rightCol,
            bottom: faceBox.bottomRow,
            left: faceBox.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
