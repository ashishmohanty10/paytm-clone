import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  // const [error, setError] = useState(null);

  const fetchData = async () => {
    await axios
      .get("http://localhost:3000/api/v1/account/balance")
      .then((res) => {
        console.log(res.data);
        setBalance(res.data.balance);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Appbar />
      <div>
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
