// Import dependencies
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = React.useState(true);

  const runCoco = async () => {
    await tf.ready();
    const net = await cocossd.load();
    console.log("COCO-SSD model loaded.");
    setLoading(false);

    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Object Detection</h1>
        <p className="App-subtitle">Real-time detection powered by TensorFlow.js</p>

        {loading && <p className="App-loading">Loading model…</p>}

        <div className="webcam-container">
          <Webcam
            ref={webcamRef}
            muted={true}
            className="webcam-feed"
          />
          <canvas ref={canvasRef} className="webcam-canvas" />
        </div>
      </header>
    </div>
  );
}

export default App;



// // Import dependencies
// import React, { useRef, useEffect } from "react";
// // import * as tf from "@tensorflow/tfjs";
// // 1. TODO - Import required model here
// // e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";
// import * as cocossd from "@tensorflow-models/coco-ssd";
// import Webcam from "react-webcam";
// import "./App.css";
// // 2. TODO - Import drawing utility here
// import { drawRect } from "./utilities";

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Main function
//   const runCoco = async () => {
//     // 3. TODO - Load network
//     // e.g. const net = await cocossd.load();
//     // await tf.setBackend("webgl");
//     await tf.ready();
//     const net = await cocossd.load();
//     console.log("COCO-SSD model loaded.");

//     //  Loop and detect objects
//     setInterval(() => {
//       detect(net);
//     }, 10);
//   };

//   const detect = async (net) => {
//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       // Get Video Properties
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       // Set video width
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       // Set canvas height and width
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // 4. TODO - Make Detections
//       // e.g. const obj = await net.detect(video);
//       const obj = await net.detect(video);
//       console.log(obj);

//       // Draw mesh
//       const ctx = canvasRef.current.getContext("2d");

//       // 5. TODO - Update drawing utility
//       drawRect(obj, ctx);
//     }
//   };

//   useEffect(() => {
//     runCoco();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <div className="App">
//       <header className="App-header">
//         <Webcam
//           ref={webcamRef}
//           muted={true}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       </header>
//     </div>
//   );
// }

// export default App;
