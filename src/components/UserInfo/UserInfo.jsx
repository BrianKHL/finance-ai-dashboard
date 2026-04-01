import { useState, useEffect } from "react";
import "./UserInfo.css";

function UserInfo() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="user-info">
      <div>ID: XXX</div>
      <div>{currentTime.toLocaleString()}</div>
    </section>
  );
}

export default UserInfo;