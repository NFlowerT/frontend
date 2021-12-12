import React from 'react'
import './css/productPage.css'
import modelPlant from "../productPage/images/model.png";


const ProductPage = () => {
    return (
      <div className={"productPage"}>
          <div className={"productPageLefts"}>
              <div className={"productPage_productinfo"}>
                  <div className={"productPageTitle"}>
                      <p className={"productPageTitleText"}>Information</p>
                      <div className={"productPageInfoUL"}></div>
                  </div>

                  <ul className={"ProductPInfoList"}>
                      <li className={"ProductPInfoTitle"}>Create Date:</li>
                      <li className={"ProductPInfo"}>28.02.2004</li>

                      <li className={"ProductPInfoTitle"}>Owner name: </li>
                      <li className={"ProductPInfo"}>Kazimierz</li>

                      <li className={"ProductPInfoTitle"}>Origin price:</li>
                      <li className={"ProductPInfo"}>1.000 USD</li>

                      <li className={"ProductPInfoTitle"}>Creator</li>
                      <li className={"ProductPInfo"}>Kazimierz</li>
                  </ul>
              </div>
          </div>
          <div className={"productPageRights"}>
              <div className={"ProductPageProductView"}>
                  <img className={'ProductPageModelImage'} src={modelPlant}></img>
              </div>
          </div>
      </div>
    )
}

export default ProductPage
