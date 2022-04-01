import React from 'react'
import './css/seedTile.css'
import seedImg from './images/seed.png'
import {Link} from "react-router-dom";

const SeedTile = ({ mint, id }) => {

    return (
        <Link className={'productPageLink'} to={'/productPage'}>
            <div className={"productTile"}>
                <div className={"productPrice"}>{id}</div>
                <div className={"productImage"}>
                    <img className={'modelImage'} src={seedImg} />
                </div>
                <div className={"productTitle"}>Nasionka twojej starej</div>

            </div>
            <button onClick={mint}>kup</button>
        </Link>
    )
}

export default SeedTile
