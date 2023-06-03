import React from "react";

const ManufacturerSection = ({
  mode,
  handleManufacturerSubmit,
  orderId,
  setOrderId,
  to,
  setTo,
  from,
  setFrom,
  quantity,
  setQuantity,
  address,
  setAddress,
  transporter,
  setTransporter,
}) => {
  return (
    <div className="mb-8">
      <form onSubmit={handleManufacturerSubmit} className="flex flex-wrap ">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            Order ID:
          </label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Auto-populated code"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            To:
          </label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Receiver"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            From:
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Sender"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            Quantity:
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 "
            style={{ padding: "9px 0px" }}
          >
            <option value="1">1 ton</option>
            <option value="2">2 ton</option>
            <option value="3">3 ton</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            Address:
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Auto-populated address"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
          <label
            className={`mb-1 text-xl sm:text-xl tracking-wide ${
              mode ? "text-white" : "text-gray-600"
            }`}
          >
            Transporter:
          </label>
          <select
            value={transporter}
            onChange={(e) => setTransporter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 "
            style={{ padding: "9px 0px" }}
          >
            <option value="">Select Transporter</option>
            <option value="Transporter A">Transporter A</option>
            <option value="Transporter B">Transporter B</option>
            <option value="Transporter C">Transporter C</option>
          </select>
        </div>
        <div className="w-full pr-2 pl-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManufacturerSection;
