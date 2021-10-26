import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/nav.css'
import { BiUserCircle } from 'react-icons/bi'
import { TiTree } from 'react-icons/ti'

const Nav = () => {
    const location = useLocation().pathname
    console.log(location)

    return (
        <nav className={'nav'}>
            <div className={'logoContainer'}>
                <div className={'lol'}>
                    <TiTree></TiTree>
                </div>
                <div className={'logoTitle' }>NFTree</div>
            </div>
            <ul className={'categoryContainer'}>
                <li>
                    <Link className={'router ' + (location === '/' ? 'selected' : ' ')} to={'/'}>HOME</Link>
                </li>
                <li>
                    <Link className={'router ' + (location === '/gallery' ? 'selected' : ' ')} to={'/gallery'}>GALLERY</Link>
                </li>
                <li>
                    <Link className={'router ' + (location === '/contact' ? 'selected' : ' ')} to={'/contact'}>CONTACT</Link>
                </li>
            </ul>
            <div className={'accountIcon'}>
                <Link className={'routerAccount'} to={'/'}>
                    <BiUserCircle></BiUserCircle>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
