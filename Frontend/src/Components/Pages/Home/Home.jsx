import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getisLoggedIn } from "../../Storage/Storage";
import Wrapper from "./Wrapper";
import { PATH_NAME } from '../../Configs/PathName'

function Home() {
  const navigate = useNavigate();
  const [loginStatus, setloginStatus] = useState(false);
  useEffect(() => {
    setloginStatus(getisLoggedIn());
  }, []);

  if (loginStatus) {
    return (<Wrapper><Outlet /></Wrapper>);
  }
  else {
    navigate(PATH_NAME.LOGIN);
  }

}

export default Home;
