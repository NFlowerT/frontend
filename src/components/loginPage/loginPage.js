import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import RegistrationPage from "./registrationPage";

const LoginPge= () => {

    return (
        <div>
            <p>zaloguj</p>
            <Link to={"/registration"}>Rejestracja</Link>
        </div>
    );
}

export default LoginPge;