import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <div>Logo</div>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/gallery'}>Gallery</Link></li>
                <li><Link to={'/contact'}>Contact</Link></li>
            </ul>
            <div>ikonka</div>
        </nav>
    )
}

export default Nav
