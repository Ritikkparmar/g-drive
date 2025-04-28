import { useEffect } from "react";
import { motion } from "framer-motion";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const remove = async () => {
    const address = document.querySelector(".address").value;
    await contract.disallow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      select.innerHTML = ""; // clear previous options to avoid duplicate
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <motion.div
          className="modalContainer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        >
          <div className="title">Share with</div>

          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            />
          </div>

          <form id="myForm">
            <select id="selectNumber">
              <option disabled selected>People With Access</option>
            </select>
          </form>

          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              className="cancel"
            >
              Cancel
            </button>
            <button onClick={() => sharing()} className="share-btn">
              Share
            </button>
            <button onClick={() => remove()} className="revoke-btn">
              Revoke
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
