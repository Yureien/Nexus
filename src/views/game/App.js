import React, { useState, useEffect } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Unity, useUnityContext } from "react-unity-webgl";

const App = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "https://iwanpiza.s3.ap-south-1.amazonaws.com/game1/buildss.loader.js",
    dataUrl: "https://iwanpiza.s3.ap-south-1.amazonaws.com/game1/buildss.data",
    frameworkUrl: "https://iwanpiza.s3.ap-south-1.amazonaws.com/game1/buildss.framework.js",
    codeUrl: "https://iwanpiza.s3.ap-south-1.amazonaws.com/game1/buildss.wasm",
  });

  return (
    <>
      <header>
        <ConnectButton />
      </header>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100vw", height: "90vh" }}
      />
    </>
  );
};

export default App;
