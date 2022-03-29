import React from 'react'
import { Link } from 'react-router-dom'
import {BiSearch} from "react-icons/bi"
import "./ css/loginPage.css"

const LoginPage = () => {
    return (
        <div className={"loginPage"}>
            <div className={"loginLogo"}>
                <h1 className={"loginLogoText"}>NFT</h1>

            </div>
            <div className={"loginSection"}>
                <div className={"textInput"}>
                    <p className={"textInputName"}>LOGIN</p>
                    <div className={'InpBorder'}>
                        <input type={'text'} placeholder={'Login'} className={'Inputt'}/>
                    </div>
                </div>
                <div className={"textInput"}>
                    <p className={"textInputName"}>PASSWORD</p>
                    <div className={'InpBorder'}>
                        <input type={'text'} placeholder={'Login'} className={'Inputt'}/>
                    </div>
                </div>
                <div className={"logButtons"}>
                    <div className={"logBut"}>LOG IN</div>
                    <Link to={'/registration'}><div className={"regBut"}>REGISTER</div></Link>
                    <a className={"forgotPass"}>Forgot Pass?</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage


