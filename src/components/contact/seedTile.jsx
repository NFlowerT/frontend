import React from 'react'
import './css/seedTile.css'
import seedImg from './images/seed.png'
import {Link} from "react-router-dom";

const SeedTile = ({ buyTreeFromSale, treeId, price, saleId }) => {

    return (
        <Link className={'productPageLink'} to={'/productPage'}>
            <div className={"productTile"}>
                <div className={"productPrice"}>id {treeId}</div>
                <div > price: {price}</div>
                <div className={"productImage"}>
                    <img className={'modelImage'} src={seedImg} />
                </div>
                <div className={"productTitle"}>Nasionka twojej starej</div>

            </div>
            <button onClick={()=>{buyTreeFromSale(saleId, price)}}>kupppp</button>
        </Link>
    )
}

export default SeedTile
