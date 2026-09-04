import { useEffect, useState } from "react";
import Egg from "./Egg";

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("ทำงานทุกครั้งที่ name เปลี่ยน");
  }, [name]);

  useEffect(() => {
    console.log("ทำงานครั้งเดียว");
  }, []);

  useEffect(() => {
    console.log("ทำงานทุกครั้ง");
  });

  return (
    <>
      <Egg />
    </>
  );
}