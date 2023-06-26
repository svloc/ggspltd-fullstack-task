import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getisLoggedIn } from '../../Storage/Storage';
import { PATH_NAME } from '../../Configs/PathName';
import Login from './Login';

function Auth() {
    const navigate = useNavigate();
    const isLoggedIn=getisLoggedIn();
    useEffect(()=>{
        if(isLoggedIn){
            navigate(PATH_NAME.LOGIN);
        }
    },[isLoggedIn,navigate])

  return (
    !isLoggedIn && <Login/>
  )
}

export default Auth;