import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import NavBarAuth from "./Navbar/NavbarAuth";
import { UserContext } from "../contexts/userContext";

function Home() {
  const { isLoggedIn } = useContext(UserContext);

  return <div>{isLoggedIn ? <NavBarAuth /> : <Navbar />}</div>;
}

export default Home;
