import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Box, Typography } from "@mui/material";
import PulsatingForward from "./PulsatingForward";
import PulsatingRewind from "./PulsatingRewind";

const totalLength = 2400;

const variants = {
  hidden: {
    strokeDasharray: `${totalLength} ${totalLength}`, // Total path length is hidden initially
    strokeDashoffset: totalLength, // Offset is also the total path length
  },
  visible: {
    strokeDasharray: `${totalLength} ${totalLength}`, // Keeps the dash array constant
    strokeDashoffset: 0, // Animates offset to 0 to reveal the path
    transition: {
      // duration: 6,
      duration: 6,
      ease: "linear",
    },
  },
  // jitter: {
  //   x: [0, -5,5, -5, 2, 0], // Horizontal jitter effect
  //   y: [0, -5,5, -5, 2, 0], // Vertical jitter effect
  //   opacity: [1,0.8,1,0.7,1,1,0.8,0.9, 0.7, 1],
  //   transition: {
  //     duration: 1.2,
  //     ease: "linear",
  //     times: [0, 0.25, 0.49, 0.6, 0.8, 1],
  //   }
  // },
  zoomOut: {
    scale: [1, 0.5],
    // originX: "40%",
    // originY: "50%",
    //so it doesnt move when we transition to this
    transition: {
      duration: 3,
      ease: "linear",
    },
  },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 5,
      ease: "easeInOut",
    },
  },
};

const AnimatedDaisyLoad = ({ onAnimationComplete, interceptedUrl }) => {
  const controls = useAnimation();

  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      await controls.start("jitter");
      await controls.start("zoomOut");
      await controls.start("fadeOut");
    };

    sequence();
  }, [controls]);

  useEffect(() => {
    // Simulate animation completion after 2 seconds for demonstration purposes
    const timer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 11000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);
  //this sets onAnimationComplete to true after timer completes
  //why is this in the dependency array?

  useEffect(() => {
    // set displaytext to true
    const timer = setTimeout(() => {
      if (onAnimationComplete) {
        setDisplayText(true);
      }
    }, 14000);

    return () => clearTimeout(timer);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1],
      transition: {
        duration: 3.7,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div>
      {!displayText ? (
        <motion.div initial="hidden" animate={controls} variants={variants}>
          <motion.svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="520px"
            height="520px"
            viewBox="0 0 512 512"
            style={{ transformOrigin: "center" }} //to prevent ifrom nudging up between tranasitions
          >
            <path
              d="M509.176,249.196c-20.497-20.508-46.3-34.693-74.232-41.144c20.978-19.545,36.223-44.749,43.722-72.746
          c0.663-2.471,0.321-5.092-0.963-7.307c-1.273-2.214-3.38-3.83-5.841-4.482c-28.007-7.499-57.437-6.9-84.856,1.487
          c8.376-27.44,8.986-56.881,1.476-84.866c-0.653-2.471-2.268-4.568-4.482-5.852c-2.214-1.273-4.846-1.615-7.307-0.952
          c-27.986,7.499-53.179,22.744-72.735,43.712c-1.829-7.938-4.268-15.726-7.339-23.3c-7.735-19.096-19.106-36.223-33.816-50.922
          c-3.755-3.766-9.853-3.766-13.608,0c-20.497,20.497-34.693,46.29-41.144,74.211c-5.552-5.959-11.554-11.479-17.994-16.507
          c-16.271-12.677-34.693-21.824-54.752-27.194c-5.135-1.38-10.42,1.669-11.789,6.804c-7.51,27.996-6.9,57.437,1.487,84.866
          c-14.56-4.45-29.783-6.772-44.92-6.772c-13.404,0-26.841,1.776-39.946,5.285c-2.461,0.653-4.568,2.268-5.841,4.482
          c-1.284,2.214-1.626,4.835-0.963,7.307c7.499,27.996,22.744,53.179,43.711,72.735c-7.938,1.829-15.726,4.268-23.3,7.339
          c-19.085,7.735-36.223,19.106-50.922,33.816c-3.766,3.755-3.766,9.853,0,13.608c20.497,20.508,46.29,34.693,74.211,41.144
          c-5.959,5.552-11.479,11.554-16.507,17.994c-12.677,16.271-21.824,34.693-27.194,54.752c-1.38,5.135,1.669,10.42,6.804,11.789
          c13.083,3.509,26.488,5.253,39.85,5.253c15.223,0,30.403-2.268,45.017-6.74c-4.45,14.56-6.772,29.783-6.772,44.92
          c0,13.404,1.776,26.841,5.285,39.946c0.653,2.461,2.268,4.568,4.482,5.841c1.476,0.856,3.134,1.294,4.814,1.294
          c0.834,0,1.669-0.107,2.493-0.332c27.996-7.499,53.179-22.744,72.745-43.722c6.44,27.943,20.636,53.735,41.144,74.232
          C251.068,511.059,253.54,512,256,512s4.932-0.941,6.804-2.824c20.508-20.497,34.693-46.3,41.144-74.233
          c19.556,20.979,44.749,36.223,72.746,43.722c0.824,0.225,1.658,0.332,2.493,0.332c1.68,0,3.338-0.439,4.814-1.294
          c2.214-1.273,3.83-3.38,4.482-5.841c7.499-28.007,6.9-57.437-1.487-84.866c14.613,4.472,29.794,6.74,45.017,6.74
          c13.362,0,26.766-1.744,39.85-5.253c5.135-1.369,8.184-6.654,6.804-11.789c-7.489-27.986-22.733-53.179-43.711-72.745
          c27.932-6.44,53.725-20.636,74.222-41.144C512.941,259.049,512.941,252.951,509.176,249.196z M377.314,149.15
          c25.054-11.136,52.933-14.357,79.806-9.264c-9.029,25.835-25.771,48.365-47.948,64.487c-2.942-0.171-5.905-0.267-8.847-0.267
          c-20.005,0-39.497,3.798-57.929,11.276c-9.318,3.776-18.272,8.494-26.659,14.025c-3.616-0.396-7.2-0.909-10.751-1.583
          c-0.021-0.054-0.053-0.107-0.086-0.15c1.209-3.445,2.546-6.815,4.001-10.099C338.331,202.81,362.433,178.708,377.314,149.15z
           M299.551,161.752c5.542-16.1,8.344-32.949,8.344-50.077c0-2.953-0.096-5.916-0.267-8.847
          c16.122-22.177,38.662-38.919,64.487-47.948c5.285,27.825,1.669,56.742-10.452,82.459c-0.043,0.086-0.086,0.171-0.128,0.246
          c-0.021,0.054-0.043,0.096-0.064,0.15c-0.032,0.054-0.054,0.107-0.086,0.16c-13.351,28.007-36.052,50.676-63.941,63.845
          c-4.215,1.99-8.612,3.787-13.116,5.36c-0.043-0.032-0.096-0.054-0.139-0.086c-0.685-3.573-1.209-7.168-1.594-10.762
          C289.677,185.501,295.389,173.915,299.551,161.752z M293.282,256c0,20.561-16.721,37.282-37.282,37.282
          c-20.561,0-37.282-16.721-37.282-37.282c0-20.561,16.721-37.282,37.282-37.282C276.561,218.718,293.282,235.439,293.282,256z
           M223.799,100.838v-0.054c2.279-28.467,13.629-55.458,32.211-77.025c9.607,11.126,17.245,23.61,22.765,37.218
          c5.156,12.72,8.323,26.114,9.414,39.85c0,0,0,0.011,0,0.021c0.3,3.573,0.449,7.21,0.449,10.826
          c0,14.988-2.461,29.729-7.296,43.818c-3.99,11.639-9.564,22.669-16.571,32.789v0.011c-2.674,3.851-5.584,7.595-8.665,11.169
          h-0.214c-3.07-3.562-5.969-7.307-8.644-11.147c0-0.011,0-0.011-0.011-0.011C229.63,162.907,221.307,131.841,223.799,100.838z
           M139.885,54.869c13.875,4.825,26.734,11.81,38.331,20.85c9.949,7.756,18.721,16.871,26.146,27.098
          c-1.894,33.046,6.922,65.963,25.044,93.478c-0.396,3.605-0.909,7.189-1.583,10.719c-0.054,0.021-0.107,0.053-0.15,0.086
          c-3.455-1.209-6.836-2.557-10.131-4.022c-13.469-26.873-34.34-49.028-60.582-64.187c-2.503-1.455-5.124-2.856-7.809-4.215
          C138.002,109.632,134.782,81.742,139.885,54.869z M54.88,139.885c8.334-1.594,16.785-2.396,25.204-2.396
          c19.748,0,39.668,4.493,57.565,12.987c3.348,1.605,6.611,3.306,9.682,5.081c23.878,13.8,42.685,34.19,54.388,58.967
          c0,0.011,0,0.011,0,0.011c0.011,0.011,0.011,0.011,0.021,0.021c1.99,4.215,3.787,8.612,5.36,13.116
          c-0.032,0.043-0.053,0.096-0.086,0.15c-3.552,0.674-7.146,1.198-10.762,1.583c-10.751-7.082-22.337-12.784-34.501-16.956
          c-16.1-5.542-32.949-8.344-50.077-8.344c-2.942,0-5.916,0.096-8.847,0.267C80.641,188.261,63.909,165.721,54.88,139.885z
           M23.76,255.989c11.126-9.607,23.61-17.245,37.218-22.765c12.72-5.156,26.114-8.323,39.839-9.414
          c3.594-0.3,7.242-0.449,10.858-0.449c14.988,0,29.729,2.461,43.818,7.296c11.639,3.99,22.68,9.575,32.8,16.571
          c3.851,2.674,7.595,5.584,11.169,8.665v0.214c-3.487,3.006-7.135,5.852-10.901,8.473c-0.043,0.021-0.086,0.053-0.128,0.086
          c-0.021,0.011-0.043,0.021-0.053,0.032c-0.032,0.021-0.053,0.043-0.086,0.053c-25.418,17.63-56.485,25.953-87.509,23.45
          C72.318,285.922,45.327,274.572,23.76,255.989z M134.675,362.85c-25.044,11.147-52.933,14.367-79.806,9.264
          c4.825-13.875,11.81-26.734,20.85-38.33c7.756-9.949,16.871-18.721,27.098-26.146c2.942,0.171,5.873,0.257,8.815,0.257
          c30.029,0,59.555-8.815,84.609-25.3c3.627,0.385,7.221,0.909,10.773,1.583c0.021,0.053,0.054,0.107,0.086,0.15
          c-1.209,3.455-2.557,6.836-4.012,10.131c-26.884,13.469-49.039,34.34-64.198,60.582
          C137.436,357.544,136.034,360.165,134.675,362.85z M204.361,409.183c-16.111,22.177-38.651,38.908-64.476,47.937
          c-1.594-8.334-2.396-16.785-2.396-25.204c0-19.748,4.493-39.668,12.987-57.576c1.605-3.338,3.306-6.601,5.081-9.671
          c13.8-23.888,34.201-42.695,58.999-54.409c4.215-1.99,8.612-3.787,13.116-5.36c0.043,0.032,0.096,0.064,0.15,0.086
          c0.674,3.552,1.187,7.135,1.583,10.751C211.283,343.23,202.468,376.148,204.361,409.183z M288.19,411.205
          c-2.279,28.467-13.629,55.468-32.19,77.025c-18.571-21.567-29.922-48.558-32.201-77.025c-2.503-31.002,5.82-62.069,23.439-87.477
          c0.086-0.128,0.171-0.257,0.246-0.385c2.61-3.723,5.424-7.339,8.409-10.805h0.214c3.017,3.498,5.852,7.146,8.473,10.912
          c0.032,0.043,0.064,0.086,0.096,0.128c0.011,0.021,0.021,0.043,0.032,0.053c0.021,0.032,0.043,0.053,0.054,0.086
          c5.606,8.077,10.313,16.796,14.014,25.91c6.547,16.132,9.863,33.185,9.863,50.697C288.639,403.941,288.489,407.6,288.19,411.205z
           M372.115,457.12c-25.835-9.029-48.376-25.771-64.487-47.948c0.171-2.942,0.267-5.905,0.267-8.847
          c0-20.005-3.798-39.497-11.276-57.929c-3.776-9.318-8.494-18.272-14.025-26.659c0.396-3.605,0.909-7.2,1.583-10.751
          c0.053-0.021,0.107-0.053,0.15-0.086c3.445,1.198,6.815,2.546,10.099,4.001c14.763,29.43,38.855,53.532,68.424,68.413
          C373.987,402.358,377.207,430.236,372.115,457.12z M457.12,372.115c-27.825,5.274-56.742,1.658-82.459-10.452
          c-0.086-0.053-0.171-0.086-0.267-0.128c-0.032-0.021-0.075-0.043-0.118-0.064c-0.053-0.021-0.107-0.054-0.171-0.086
          c-28.007-13.351-50.676-36.052-63.845-63.941c-1.99-4.215-3.787-8.612-5.36-13.116c0.032-0.043,0.053-0.096,0.086-0.139
          c3.573-0.685,7.168-1.209,10.751-1.594c10.751,7.082,22.337,12.795,34.533,16.967c16.154,5.552,32.864,8.344,49.852,8.344
          c3.017,0,6.034-0.096,9.061-0.267C431.37,323.76,448.102,346.301,457.12,372.115z M411.205,288.201
          c-18.657,1.508-37.057-0.792-54.688-6.847c-11.65-3.99-22.669-9.564-32.778-16.56c-0.011-0.011-0.032-0.021-0.053-0.043
          c-3.841-2.664-7.574-5.563-11.147-8.644v-0.214c3.498-3.017,7.146-5.862,10.912-8.473c0.043-0.032,0.086-0.064,0.139-0.096
          c0.011-0.011,0.032-0.021,0.043-0.032c0.032-0.021,0.053-0.043,0.086-0.053c8.077-5.606,16.796-10.313,25.91-14.014
          c16.132-6.547,33.185-9.863,50.697-9.863c3.616,0,7.264,0.15,10.88,0.449c28.467,2.279,55.468,13.629,77.025,32.19
          C466.662,274.572,439.672,285.922,411.205,288.201z"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </motion.svg>
        </motion.div>
      ) : (
        <Box
          sx={{
            height: "520px",
            width: "520px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <Typography
              sx={{
                fontFamily: "Display",
                fontSize: "48px",
                fontStyle: "italic",
                fontWeight: 200,
                textAlign: "center",
                position: "absolute",
                width: "25rem",
                top: "30%",
                left: "50%",
                //this makes the text relative to the parent container, the box
                transform: "translate(-50%, -50%)",
              }}
            >
              Take a breath. Focus mode is on.{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "35rem",
                gap: "10rem",
                position: "relative",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.history.back();
                }}
              >
                <PulsatingRewind />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (interceptedUrl) {
                    window.location.href = `http://google.com`;
                  }
                }}
              >
                <PulsatingForward />
              </div>
            </Box>
          </motion.div>
        </Box>
      )}
    </div>
  );
};

export default AnimatedDaisyLoad;
