import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div>
            <p>zaloguj</p>
            <Link to={'/registration'}>Rejestracja</Link>
        </div>
    )
}

export default LoginPage
