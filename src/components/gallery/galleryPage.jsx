import React, {useEffect} from 'react'
import './css/galleryPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import ProductTile from "./productTile";


const GalleryPage = ({ trees, totalSupply, accountsTrees, accountBalance, putOnSale }) => {


    // to test withour real blockchain trees
    const renderProductTileAll = () => {
        const productTiles = []
        for (let i = 0; i<totalSupply; i++) {
            console.log(trees[i].genes, "tilee", trees)
            productTiles.push(<ProductTile key={null} id={trees[i].tree.id} putOnSale={null} />)
        }
        return (
            <section className={"productsContainer"}>
                {productTiles}
            </section>
        )
    }

    const renderProductTileAccount = () => {
            const productTiles = []
            console.log("tile",accountsTrees)
            for (let i = 0; i<accountBalance; i++) {
                console.log(accountsTrees[i], "tile")
                productTiles.push(<ProductTile id={accountsTrees[i].id} putOnSale={putOnSale}/>)
            }
            return (
                <section className={"productsContainer"}>
                    {productTiles}
                </section>
            )
        }
    var style = { backgroundColor: "red" } // do testowania

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
            {(trees.length)?renderProductTileAll():null}

            <div style={style}>your trees {(accountsTrees.length)?renderProductTileAccount() : null}</div>
            {/*<div style={style}>{renderProductTile(accountsTrees)}</div>*/}

        </main>
    )
}

export default GalleryPage
