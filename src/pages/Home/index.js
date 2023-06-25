import React, { useState, useEffect } from "react";
import ManufacturerSection from "../../components/ManufacturerSection";
import TransporterSection from "../../components/TransporterSection";
import {
  getMessage,
  getResponse,
  postMessage,
  postResponse,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useToasts } from "react-toast-notifications";

const Home = ({ mode, setMode, CiDark, CiLight }) => {
  const { addToast } = useToasts();
  const [messages, setMessages] = useState([]);
  const [resp, setResp] = useState([]);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [orderId, setOrderId] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [transporter, setTransporter] = useState("");
  const [responseOrderId, setResponseOrderId] = useState("");
  const [price, setPrice] = useState(Number);
  const [loading, setLoading] = useState(false);

  const [msgLoading, setMsgLoading] = useState(false);
  const [resLoading, setResLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchResponse();
  }, []);
  const navigate = useNavigate();
  let data = messages[0];
  let respData = resp[0];
  console.log(respData);
  // const result = data?.messages;
  // console.log(data?.messages);

  const fetchData = () => {
    setLoading(false);
    getMessage()
      .then((response) => {
        setMsgLoading(true);
        if (response.status === 200) {
          const responseData = response.data;
          setMsgLoading(false);
          // console.log(responseData);
          if (Array.isArray(responseData)) {
            setMessages(responseData);
          } else if (typeof responseData === "object") {
            setMessages([responseData]);
          }
        }
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchResponse = () => {
    getResponse()
      .then((response) => {
        setResLoading(true);
        if (response.status === 200) {
          const responseData = response.data;
          setResLoading(false);
          // console.log(responseData);
          if (Array.isArray(responseData)) {
            setResp(responseData);
          } else if (typeof responseData === "object") {
            setResp([responseData]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Filter messages based on search criteria
  const filteredMessages = data?.messages?.filter(
    (message) =>
      message?.orderId?.includes(searchOrderId) &&
      message?.to?.includes(searchTo) &&
      message?.from?.includes(searchFrom)
  );
  // console.log(filteredMessages);

  // Handle form submit for the manufacturer
  const handleManufacturerSubmit = async (e) => {
    e.preventDefault();
    setMsgLoading(true);
    const newMessage = {
      id: messages.length + 1,
      orderId,
      to,
      from,
      content: `Message for order ${orderId}`,
    };
    console.log(newMessage);
    setMessages([...messages, newMessage]);
    setOrderId("");
    setTo("");
    setFrom("");
    setQuantity("");
    setAddress("");
    setTransporter("");
    postMessage(newMessage)
      .then((response) => {
        addToast("Manufracturer Message Send Successfully!", {
          appearance: "success",
        });
        if (response.status === 200) {
          const responseData = response.data;

          if (Array.isArray(responseData)) {
            setMessages(responseData);
          } else if (typeof responseData === "object") {
            setMessages([responseData]);
          }
        }
        setMsgLoading(false);
        fetchData();
      })
      .catch((error) => {
        addToast("Error!", {
          appearance: "error",
        });
      });
  };

  // Call the function to send the data
  const handleTransporterSubmit = async (e) => {
    e.preventDefault();
    setResLoading(true);
    // Send the response back to the manufacturer
    // You can handle the response logic here
    const responseMessage = {
      id: messages.length + 1,
      orderId: responseOrderId,
      to: "Manufacturer",
      from: "Transporter",
      content: `Response for order ${responseOrderId} with price ${price}`,
    };
    console.log(messages);
    setMessages([...messages, responseMessage]);
    // Clear the form inputs
    setResponseOrderId("");
    setPrice("");
    postResponse(responseMessage)
      .then((response) => {
        addToast("Transporter Message Send Successfully!", {
          appearance: "success",
        });
        if (response.status === 200) {
          const responseData = response.data;

          if (Array.isArray(responseData)) {
            setMessages(responseData);
          } else if (typeof responseData === "object") {
            setMessages([responseData]);
          }
        }
        setResLoading(false);
        fetchData();
      })
      .catch((error) => {
        addToast("Error!", {
          appearance: "error",
        });
      });
  };

  const Logout = () => {
    addToast("Logout Successfully!", {
      appearance: "success",
    });
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    });
  };

  return (
    <div
      className={` mx-auto p-4 ${
        mode ? "bg-black" : "bg-white"
      }  w-full  object-contain`}
    >
      <div className="flex justify-around">
        <h1
          className={`${
            mode ? " text-white" : "text-black"
          } text-center  text-3xl italic w-max `}
        >
          Dashboard
        </h1>
        <button
          className={`${
            mode ? " text-white" : "text-black"
          } text-5xl rounded-xl border-solid border-2`}
          onClick={() => {
            setMode(!mode);
            addToast(
              mode
                ? "Light Mode Enable Successfully!"
                : "Dark Mode Enable Successfully!",
              { appearance: "success" }
            );
          }}
        >
          {mode ? <CiDark /> : <CiLight />}
        </button>
        <button
          className={`${
            mode ? " text-white" : "text-black"
          } text-xl rounded-xl border-solid border-2 px-2`}
          onClick={Logout}
        >
          Logout
        </button>
      </div>
      <h2
        className={`${
          mode ? " text-white" : "text-black"
        }  text-2xl font-bold mb-4 `}
      >
        Manufacturer
      </h2>
      <ManufacturerSection
        mode={mode}
        handleManufacturerSubmit={handleManufacturerSubmit}
        orderId={orderId}
        setOrderId={setOrderId}
        to={to}
        setTo={setTo}
        from={from}
        setFrom={setFrom}
        quantity={quantity}
        setQuantity={setQuantity}
        address={address}
        setAddress={setAddress}
        setTransporter={setTransporter}
        msgLoading={msgLoading}
      />
      <div className="mb-8">
        <h2
          className={`mb-1 font-bold text-xl sm:text-xl tracking-wide ${
            mode ? "text-white" : "text-gray-600"
          }`}
        >
          Transporter
        </h2>
        <TransporterSection
          mode={mode}
          handleTransporterSubmit={handleTransporterSubmit}
          responseOrderId={responseOrderId}
          setResponseOrderId={setResponseOrderId}
          price={price}
          setPrice={setPrice}
          filteredMessages={filteredMessages}
          resLoading={resLoading}
        />
      </div>
      <div>
        <h2
          className={`mb-1 font-bold text-xl sm:text-xl tracking-wide ${
            mode ? "text-white" : "text-gray-600"
          }`}
        >
          Messages
        </h2>
        <div className="mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            Order ID:
          </label>
          <input
            type="text"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Search by Order ID"
          />
        </div>
        <div className="mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            To:
          </label>
          <input
            type="text"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Search by To"
          />
        </div>
        <div className="mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            From:
          </label>
          <input
            type="text"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Search by From"
          />
        </div>
        {loading ? (
          <React.Fragment>
            <div className="pr-2 pl-2">
              <h2
                className={`mb-1 font-bold  text-xl sm:text-xl tracking-wide ${
                  mode ? "text-white" : "text-gray-600"
                }`}
              >
                ManuFracturer
              </h2>
              {filteredMessages?.map((message, id) => (
                <div
                  key={id}
                  className="border border-gray-300 rounded p-4 mb-4 "
                >
                  <h3
                    className={`mb-1 font-bold  text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Order ID: {message.orderId}
                  </h3>
                  <p
                    className={`mb-1 text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    To: {message.to}
                  </p>
                  <p
                    className={`mb-1 text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    From: {message.from}
                  </p>
                </div>
              ))}
            </div>
            <div className="pr-2 pl-2">
              <h2
                className={`mb-1 font-bold  text-xl sm:text-xl tracking-wide ${
                  mode ? "text-white" : "text-gray-600"
                }`}
              >
                Transporter
              </h2>
              {respData?.response?.map((response, id) => (
                <div
                  key={id}
                  className="border border-gray-300 rounded p-4 mb-4 "
                >
                  <h3
                    className={`mb-1 font-bold  text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Order ID: {response.orderId}
                  </h3>

                  <p
                    className={`mb-1 text-xl sm:text-xl tracking-wide ${
                      mode ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Content: {response.content}
                  </p>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <div className="flex justify-center">
            <CgSpinner
              className={`animate-spin text-5xl ${
                mode ? "text-white" : "text-indigo-700"
              } `}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
