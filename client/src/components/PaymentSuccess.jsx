import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchdatafromapi } from '../utils/api';
import { Context } from '../utils/context';

function PaymentSuccess() {
  const { orderid } = useContext(Context);
  const [k, setK] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 5);
const formattedDate = currentDate.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
console.log(formattedDate);

  var f;

  useEffect(() => {
    const getKeys = async () => {
      try {
        const res1 = await fetchdatafromapi("/api/orders?sort[0]=id:desc&fields[0]=OrderID&pagination[limit]=1");
        f = res1.data[0].attributes.OrderID;
        console.log(f);
        setK(res1.data[0].attributes.OrderID);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Set loading to false when data fetching is complete
      }
    };

    // Call the getKeys function when the component mounts
    getKeys();
  }, []); // An empty dependency array ensures this effect runs once on mount
  const navigate=useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ color: "green", fontSize: "100px", margin: "30px" }}>
            Payment Success
          </div>
          <div
            style={{
              color: "rgba(0,0,0,0.7)",
              fontSize: "25px",
              marginBottom: "25px",
            }}
          >
            Your OrderID: {k}
          </div>
          <div
            style={{
              color: "rgba(0,0,0,0.7)",
              fontSize: "25px",
              marginBottom: "25px",
            }}
          >
            Expected Delivery Date:{formattedDate}
          </div>
          <button
            style={{
              backgroundColor: "#8e2de2", // Background color
              color: "white", // Text color
              padding: "10px 20px", // Padding around the text
              fontSize: "18px", // Font size
              border: "none", // Remove border
              cursor: "pointer", // Add a pointer cursor on hover
              marginBottom:"25px",
              borderBottom: "3px solid #6516aa",
            }}
            onClick={()=>{navigate("/")}}
          >
            Continue to Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
