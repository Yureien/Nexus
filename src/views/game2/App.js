import React, { useState, useEffect } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Unity, useUnityContext } from "react-unity-webgl";

const App = () => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl:
      "https://iwanpiza.s3.ap-south-1.amazonaws.com/game2/BuildsScene2.loader.js",
    dataUrl:
      "https://iwanpiza.s3.ap-south-1.amazonaws.com/game2/BuildsScene2.data",
    frameworkUrl:
      "https://iwanpiza.s3.ap-south-1.amazonaws.com/game2/BuildsScene2.framework.js",
    codeUrl:
      "https://iwanpiza.s3.ap-south-1.amazonaws.com/game2/BuildsScene2.wasm",
  });

  return (
    <>
      <header>
        <ConnectButton />
      </header>
      {!isLoaded && (
        <p>Loading Game... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100vw", height: "90vh" }}
      />
    </>
  );
};

export default App;
