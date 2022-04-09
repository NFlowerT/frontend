import React from 'react'
import './css/prodcutTile.css'
import modelPlant from './images/model.png'
import {Link} from "react-router-dom";


const ProductTile = ({ id , putOnSale, genes}) => {
    return (
        <Link className={'productPageLink'} to={'/productPage'}>
            <div className={"productTile"}>
                <div className={"productPrice"}>id drzewka: {id}  |||| geny:{genes}</div>
                <div className={"productImage"}>
                    <img className={'modelImage'} src={modelPlant} />
                </div>
                <div className={"productTitle"}>Dąb Maksymiliański</div>
                <button onClick={()=>{putOnSale(id)}}>sale</button>
            </div>
        </Link>
    )
}

export default ProductTile
