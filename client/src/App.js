import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

import { motion } from "framer-motion"; // ⭐ added motion

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      {!modalOpen && (
        <motion.button
          className="share"
          onClick={() => setModalOpen(true)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          style={{ cursor: "pointer" }}
        >
          Share
        </motion.button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        {/* Animated heading */}

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #ffffff, #dcdcdc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "10px",
          }}
        >
          Vaultify
        </motion.h1>

        {/* Description under heading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            color: "#bbbbbb",
            fontSize: "1.2rem",
            marginBottom: "40px",
          }}
        >
          Securely upload and share your files on the blockchain with ease.
        </motion.p>

        {/* Background animation layers */}
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        {/* Account Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ color: "white", marginBottom: "30px" }}
        >
          Account : {account ? account : "Not connected"}
        </motion.p>

        {/* Upload and Display components */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <FileUpload
            account={account}
            provider={provider}
            contract={contract}
          />
          <Display contract={contract} account={account} />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <motion.div
          className="motion-text"
          animate={{ y: [0, -5, 0] }} // Up and down animation
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Made with ❤️ by Team Vaultify
        </motion.div>
      </footer>
    </>
  );
}

export default App;
