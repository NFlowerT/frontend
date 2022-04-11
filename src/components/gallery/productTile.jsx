import React from 'react'
import './css/prodcutTile.css'
import modelPlant from './images/model.png'
import {Link} from "react-router-dom";


const ProductTile = ({ id , putOnSale, genes, saleId, endSale}) => {
    return (
        <Link className={'productPageLink'} to={'/productPage'}>
            <div className={"productTile"}>
                <div className={"productPrice"}>id drzewka: {id}  |||| geny:{genes} }}} {saleId}</div>
                <div className={"productImage"}>
                    <img className={'modelImage'} src={modelPlant} />
                </div>
                <div className={"productTitle"}>Dąb Maksymiliański</div>
                <button onClick={()=>{putOnSale(id)}}>sale</button>
                {(saleId!==undefined)? <button onClick={()=>{endSale(saleId)}}>end sale</button> :null}
            </div>
        </Link>
    )
}

export default ProductTile
