import React from 'react'
import './css/galleryPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import ProductTile from "./productTile";


const GalleryPage = () => {
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
            <section className={"productsContainer"}>
                <ProductTile/>
                <ProductTile/>
                <ProductTile/>
                <ProductTile/>
                <ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/><ProductTile/>
            </section>
        </main>
    )
}

export default GalleryPage
