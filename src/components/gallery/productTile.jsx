import React from 'react'
import './css/prodcutTile.css'
import modelPlant from './images/model.png'
import {Link} from "react-router-dom";


const ProductTile = ({ id }) => {
    return (
        <Link className={'productPageLink'} to={'/productPage'}>
            <div className={"productTile"}>
                <div className={"productPrice"}>id drzewka: {id}</div>
                <div className={"productImage"}>
                    <img className={'modelImage'} src={modelPlant} />
                </div>
                <div className={"productTitle"}>Dąb Maksymiliański</div>
            </div>
        </Link>
    )
}

export default ProductTile
