import React from 'react'
import './css/catalogPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import SeedTile from "./seedTile";
import ProductTile from "../gallery/productTile";

const CatalogPage = ({contract, account, mint, treesOnSale, buyTreeFromSale} ) => {
    var style = { backgroundColor: "red" } // do testowania

    const renderProducts = () => {
        const productTiles = []
        for (let i = 0; i<treesOnSale.length; i++) {
            console.log(treesOnSale, treesOnSale.length)
            productTiles.push(<SeedTile treeId={treesOnSale[i].tree.TreeId} saleId={i} contract={contract} account={account} buyTreeFromSale={buyTreeFromSale} price={treesOnSale[i].tree.valueWei}/>)
        }
        return (
            <section className={"productsContainer"}>
                {productTiles}
            </section>
        )
    }

    return (
        <main className={"galleryPage"}>
            <button onClick={mint}>kup nowe drzewko</button>
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
                  {/*<SeedTile contract={contract} account={account} mint={mint}/>*/}
            </section>
            <div style={style}>
                <p>trees on sale</p>
                {(treesOnSale.length)?renderProducts() :null}
            </div>
        </main>
    )
}

export default CatalogPage
