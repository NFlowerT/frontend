import React from 'react'
import './css/homePage.css'
import modelPlant from './image/model.png'

const HomePage = () => {
    return (
        <main>
            <div className={'leftContainer'}>
                <div className={'homeTextContainer'}>
                    <div className={'kreska'}></div>
                    <div className={'kreska2'}></div>
                    <div>
                        <div className={'titleHome1'}>Project</div>
                        <div className={'titleHome2'}>NFTree</div>
                    </div>
                    <div className={'aboutprjContainer'}>
                        <div className={'aboutprjText'}>About project</div>
                        <div className={'kreska3'}></div>
                    </div>
                    <div className={'abouttxtContainer'}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum augue vitae est gravida, ornare malesuada tortor pulvinar. Pellentesque habitant morbiLorem ipsum dolor sit amet, consectetur adipiscing
                        </p>
                    </div>
                    <div className={'homeButtonContainer'}>
                        <button className={'homeButton'}>Read More</button>
                    </div>
                </div>
            </div>
            <div className={'rightContainer'}>
                <div className={'modelContainer'}>
                    <div className={'modelPlant'}>
                        <img className={'modelImg'} src={modelPlant} />
                    </div>
                    <div className={'modelName'}>Owner: Kazimierz</div>
                </div>

            </div>
        </main>
    )
}

export default HomePage
