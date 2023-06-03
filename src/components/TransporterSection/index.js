import React from "react";

const TransporterSection = ({
  mode,
  handleTransporterSubmit,
  responseOrderId,
  setResponseOrderId,
  price,
  setPrice,
  filteredMessages,
}) => {
  return (
    <form onSubmit={handleTransporterSubmit} className="flex flex-wrap">
      <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
        <label
          className={`mb-1 text-xl sm:text-xl tracking-wide ${
            mode ? "text-white" : "text-gray-600"
          }`}
        >
          Order ID:
        </label>
        <select
          value={responseOrderId}
          onChange={(e) => setResponseOrderId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 "
          style={{ padding: "9px 0px" }}
        >
          <option value="">Select Order ID</option>
          {filteredMessages?.map((message, id) => (
            <option key={id} value={message.orderId}>
              {message.orderId}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 mb-4 pr-2 pl-2">
        <label
          className={`mb-1 text-xl sm:text-xl tracking-wide ${
            mode ? "text-white" : "text-gray-600"
          }`}
        >
          Price:
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Price"
        />
      </div>
      <div className="w-full pr-2 pl-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
        >
          Reply
        </button>
      </div>
    </form>
  );
};

export default TransporterSection;
