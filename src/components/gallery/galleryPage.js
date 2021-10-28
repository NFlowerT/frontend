import React from 'react'
import './css/galleryPage.css'
import { BiSearch } from 'react-icons/bi'
import { FaBars } from 'react-icons/fa'

const GalleryPage = () => {
    return (
        <main>
            <section className={'guideSection'}>
                <div className={'searchbar'}>
                    <input type={"text"} placeholder={"search"} className={"search"}/>
                    <BiSearch className={"searchIcon"}></BiSearch>
                </div>
                <div className={"filterBar"}>
                    FILTR <FaBars className={"filterIcon"}></FaBars>
                </div>
            </section>

        </main>
    )
}

export default GalleryPage
