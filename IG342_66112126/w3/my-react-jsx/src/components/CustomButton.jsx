import { useState } from "react";

export function CustomButton({ name }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    alert(`Hello ${name} ${newCount}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        margin: "4px",
        padding: "8px 16px",
        fontSize: "14px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      {name}
    </button>
  );
}
