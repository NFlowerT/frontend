import React from 'react'
import './css/galleryPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import ProductTile from "./productTile";


const GalleryPage = ({ trees, totalSupply }) => {

    const renderProductTile = () => {
        const productTiles = []
        for (let i = 0; i<totalSupply; i++) {
            console.log(i)
            productTiles.push(<ProductTile key={i} />)
        }
        return (
            <section className={"productsContainer"}>
                {productTiles}
            </section>
        )
    }

    return (
        <main className={"galleryPage"}>
            <section className={'guideSection'}>
                <div className={'searchbar'}>
                    <input type={'text'} placeholder={'search'} className={'search'}/>
                    <BiSearch className={'searchIcon'}/>
                </div>
                <div className={'filterBar'}>
                    FILTR <FaBars className={'filterIcon'}/>
                </div>
            </section>
            {renderProductTile()}
        </main>
    )
}

export default GalleryPage
