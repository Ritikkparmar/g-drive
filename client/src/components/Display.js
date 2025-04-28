import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
const getdata = async () => {
  let dataArray;
  const Otheraddress = document.querySelector(".address").value;

  try {
    if (Otheraddress) {
      dataArray = await contract.display(Otheraddress);
      console.log(dataArray);
    } else {
      dataArray = await contract.display(account);
    }
  } catch (e) {
    console.error("Error fetching data:", e); // Log the error object for debugging
    alert(e.message || "You don't have access"); // Display a readable error message
    return; // Exit the function to avoid further execution
  }

  // Check if dataArray is defined and not null
  if (dataArray !== undefined && dataArray !== null) {
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
      const images = str_array.map((item, i) => {
        let hash = item;
        // If item is a full Pinata gateway URL
        if (item.startsWith("https://gateway.pinata.cloud/ipfs/")) {
          hash = item.replace("https://gateway.pinata.cloud/ipfs/", "");
        }
        // If item is an ipfs:// link
        else if (item.startsWith("ipfs://")) {
          hash = item.replace("ipfs://", "");
        }
        // If item is already just the hash, do nothing

        const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
        return (
          <div key={i} className="image-container">
            <img
              src={url}
              alt="uploaded"
              className="image-list"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                margin: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            />
          </div>
        );
      });

      setData(images);
    } else {
      alert("No image to display");
    }
  } else {
    alert("Error fetching data");
  }
};
  return (
    <>
      <div className="image-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {data}
      </div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata} style={{ cursor: 'pointer' }}> 
        Get Data
      </button>
    </>
  );
};

export default Display;
