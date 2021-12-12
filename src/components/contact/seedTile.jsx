import React from 'react'
import './css/seedTile.css'
import seedImg from './images/seed.png'
import {Link} from "react-router-dom";


const SeedTile = () => {
    return (
        <Link className={'productPageLink'} to={'/productPage'}>
            <div className={"productTile"}>
                <div className={"productPrice"}>200px</div>
                <div className={"productImage"}>
                    <img className={'modelImage'} src={seedImg} />
                </div>
                <div className={"productTitle"}>Nasionka twojej starej</div>
            </div>
        </Link>
    )
}

export default SeedTile
