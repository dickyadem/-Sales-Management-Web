import React from "react";
import styles from "../headers.module.css";
import "../Contoh.css";
import { useState } from "react";
import { FaAd, FaTrash } from "react-icons/fa";
import { BsFillBookmarksFill } from "react-icons/bs";

const Header = () => {
  let [user, setUser] = useState({
    username: "",
    password: "",
  });

  const changeInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setUser((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <FaTrash />
      <FaAd />
      <BsFillBookmarksFill />
      <h1 onClick={changeInput}>{JSON.stringify(user)}</h1>
      <input
        type="text"
        name="username"
        value={user.username || ""}
        onChange={changeInput}
      />
      <input
        type="text"
        name="password"
        value={user.password || ""}
        onChange={changeInput}
      />
    </>
  );
};

export default Header;
