import React, { useState, useEffect } from "react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Unity, useUnityContext } from "react-unity-webgl";

const App = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "argon-design-system-react/game/buildss.loader.js",
    dataUrl: "argon-design-system-react/game/buildss.data",
    frameworkUrl: "argon-design-system-react/game/buildss.framework.js",
    codeUrl: "argon-design-system-react/game/buildss.wasm",
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
