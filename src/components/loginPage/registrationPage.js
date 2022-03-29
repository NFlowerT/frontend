import React from 'react'
import {Link} from "react-router-dom";
import "./ css/registrationPage.css"

const RegistrationPage = () => {
    return (
        <div>
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
                    <div className={"textInput"}>
                        <p className={"textInputName"}>PASSWORD</p>
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
                        <div className={"logBut"}>REGISTER</div>
                        <Link to={'/registration'}><div className={"regBut"}>I have acc</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
