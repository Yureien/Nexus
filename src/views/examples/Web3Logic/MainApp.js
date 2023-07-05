import "./App.css";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css"; // don't forget to import default stylesheet
import { useWallet } from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js";
import Form from "./Form";
import DemoNavbar from "components/Navbars/DemoNavbar";

function createListingTxnBlock(x) {
  //need to transfer time in days and convert it here
  // define a programmable transaction block
  const txb = new TransactionBlock();

  // contract address might be wrong
  const contractAddress =
    "0x4bf85e1981fd08fccf09d93f1337197df89abd186a79504925fc422f4c091acb";
  const contractModule = "advertisement";
  const contractMethod = "create";

  const duration_ms = x;
  const fee = duration_ms * 300 + 10000;
  console.log("hey");
  const [coin] = txb.splitCoins(txb.gas, [txb.pure(fee)]);
  console.log("hey");
  console.log(coin);
  //need to fill
  // const nftDescription = "Hello, Suiet NFT";
  // const nftImgUrl =
  //   "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4";

  txb.moveCall({
    target: `${contractAddress}::${contractModule}::${contractMethod}`,
    arguments: [
      txb.pure(duration_ms),
      coin,
      txb.object("0x6"),
      //tx.pure(nftImgUrl),
    ],
  });

  return txb;
}

function App() {
  const wallet = useWallet();

  async function handleFormSubmit(formData) {
    console.log("hey0");

    if (!wallet.connected) return;

    console.log("hey1");
    const txb = createListingTxnBlock(12000);
    console.log("hey2");
    // call the wallet to sign and execute the transaction
    const res = await wallet.signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });
    console.log("hey3");
    console.log("listing created successfully!", res);
    alert("Congrats! your advertisement is listed!");
    console.log("hey4");
    // console.log("Form dataiuhiugiuhiuh:", formData);
  }

  return (
    <div className="App">
      {wallet.status === "connected" ? (
        <>
          <Form onFormSubmit={handleFormSubmit} />
          {/* <DemoNavbar /> */}
        </>
      ) : (
        <>
          <h1 className="title">Hello, Suiet Wallet Kit</h1>
          <ConnectButton />
        </>
      )}
    </div>
  );
}
export default App;
