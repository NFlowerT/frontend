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
            <Link className={'logoContainer'} to={'/'}>
                <div className={'logoIcon'}>
                    <TiTree></TiTree>
                </div>
                <div className={'logoTitle' }>NFTree</div>
            </Link>
            <ul className={'categoryContainer'}>
                <li>
                    <Link className={'router ' + (location === '/' ? 'selected' : ' ')} to={'/'}>HOME</Link>
                </li>
                <li>
                    <Link className={'router ' + (location === '/gallery' ? 'selected' : ' ')} to={'/gallery'}>GALLERY</Link>
                </li>
                <li>
                    <Link className={'router ' + (location === '/catalog' ? 'selected' : ' ')} to={'/catalog'}>CATALOG</Link>
                </li>
            </ul>
            <div className={"wallet"}>

            </div>
            <div className={'accountIcon'}>
                <Link className={'routerAccount'} to={'/'}>
                    <BiUserCircle></BiUserCircle>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
