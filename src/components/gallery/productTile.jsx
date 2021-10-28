import React from 'react'
import './css/prodcutTile.css'
import modelPlant from './images/model.png'


const ProductTile = () => {
    return (
        <div className={"productTile"}>
            <div className={"productPrice"}>200px</div>
            <div className={"productImage"}>
                <img className={'modelImage'} src={modelPlant} />
            </div>
            <div className={"productTitle"}>Dąb Maksymiliański</div>
        </div>
    )
}

export default ProductTile
