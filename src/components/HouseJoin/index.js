import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Input } from "antd";

import HTTPClient from "../../HTTPClient";

import "./index.css";

const client = new HTTPClient(process.env.REACT_APP_API_URL, {
  Authorization: localStorage.getItem("token"),
});

const { Search } = Input;

const HouseJoin = ({ location }) => {
  const { queryString } = location;
  let initialCode = "";
  if (queryString) {
    initialCode = queryString.split("?token=")[1];
  }
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(initialCode);
  const onJoinAttempt = async () => {
    if (!code) {
      addToast("Please enter a valid code.", { appearance: "success" });
      return;
    }
    setLoading(true);

    const res = await client.get(`house/user/join?token=${code}`);
    // console.log(res);
    const { data, success } = res;
    if (!success) {
      addToast(data.msg || "An error occured", { appearance: "error" });
    } else {
      addToast(
        "Joined house successfuly. Redirecting to your houses page in 5 seconds",
        {
          appearance: "success",
        }
      );
      setTimeout(() => (window.location = "/houses/all"), 5500);
    }

    setLoading(false);
  };
  return (
    <div className="house-join-wrapper">
      <h3>Enter the code for the house you want to join</h3>
      <Search
        disabled={loading}
        placeholder="input search text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onSearch={onJoinAttempt}
        enterButton={!loading ? "Join House" : "Please wait ..."}
      />
    </div>
  );
};

export default HouseJoin;
