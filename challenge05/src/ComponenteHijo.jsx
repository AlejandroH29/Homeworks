import React from "react";

function NumeroButton({ value, onClick }) {
  return (
    <button onClick={() => onClick(value)}>
      {value}
    </button>
  );
}

export default React.memo(NumeroButton);
