import React from "react";

const Message = ({ message, variant }) => {
  return (
    <div
      className={`${variant} text-center font-semibold w-min whitespace-nowrap m-auto p-3 rounded-sm`}
    >
      {message}
    </div>
  );
};

export default Message;
