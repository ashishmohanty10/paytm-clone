import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance")
      .then((res) => {
        setBalance(res.data.balance);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <Appbar />
      <div>
        {error && <p>Error: {error}</p>} =
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
