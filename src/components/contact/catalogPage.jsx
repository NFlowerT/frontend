import React from 'react'
import './css/catalogPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import SeedTile from "./seedTile";
import ProductTile from "../gallery/productTile";

const CatalogPage = ({contract, account, mint, treesOnSale} ) => {
    var style = { backgroundColor: "red" } // do testowania

    const renderProducts = () => {
        const productTiles = []
        for (let i = 0; i<treesOnSale.length; i++) {
            console.log(treesOnSale, treesOnSale.length)
            productTiles.push(<SeedTile id={treesOnSale[i].tree.TreeId}  contract={contract} account={account} mint={mint}/>)
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
            <section className={"productsContainer"}>
                  <SeedTile contract={contract} account={account} mint={mint}/>
            </section>
            <div style={style}>
                <p>trees on sale</p>
                {(treesOnSale.length)?renderProducts() :null}
            </div>
        </main>
    )
}

export default CatalogPage
