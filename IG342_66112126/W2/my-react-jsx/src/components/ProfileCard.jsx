import { useState } from "react";

export function ProfileCard({ name }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    alert(`Hello ${name} ${newCount}`);
  };

  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ marginBottom: "6px" }}>Profile: {name}</div>
      <button
        onClick={handleClick}
        style={{
          padding: "6px 16px",
          fontSize: "14px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {name} (กด: {count})
      </button>
    </div>
  );
}
