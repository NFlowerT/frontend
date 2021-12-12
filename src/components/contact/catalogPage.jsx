import React from 'react'
import './css/catalogPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import SeedTile from "./seedTile";

const CatalogPage = () => {
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
                  <SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/><SeedTile/>
            </section>
        </main>
    )
}

export default CatalogPage
