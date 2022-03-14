import React, {useEffect} from 'react'
import './css/galleryPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'
import ProductTile from "./productTile";


const GalleryPage = ({ trees, totalSupply, accountsTrees, accountBalance }) => {
    useEffect(()=>{
        console.log("RELOOOOOOOOOOOOOAAAAAAADDDDDDDD", accountBalance)

    }, [totalSupply, accountsTrees, accountBalance, trees])


    // to test withour real blockchain trees
    const renderProductTileAll = () => {
        const productTiles = []
        for (let i = 0; i<totalSupply; i++) {
            console.log(i, "tilee", accountsTrees)
            productTiles.push(<ProductTile id={i} />)
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
                console.log(i, "tile")
                productTiles.push(<ProductTile id={trees.length[i]} />)
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
            {renderProductTileAll()}

            <div style={style}>your trees {renderProductTileAccount()}</div>
            {/*<div style={style}>{renderProductTile(accountsTrees)}</div>*/}

        </main>
    )
}

export default GalleryPage
