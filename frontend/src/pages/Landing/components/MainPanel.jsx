import {Carousel} from "antd";

const MainPanel = () => {
    return (
        <div className={'main-panel-container'}>
            <div className={'carrousel-container'}>
                <Carousel
                    autoplay
                    dotPosition={"bottom"}
                    autoplaySpeed={1800}
                >
                    <div className={'carousel-content'}>
                        <img className={'carousel-img'} width={'80%'} height={'auto'} src={'/doodle_background.png'} alt={'img'} />
                    </div>
                    <div className={'carousel-content'}>
                        <img className={'carousel-img'} width={'80%'} height={'auto'} src={'/doodle_background.png'} alt={'img'} />
                    </div>
                    <div className={'carousel-content'}>
                        <img className={'carousel-img'} width={'80%'} height={'auto'} src={'/doodle_background.png'} alt={'img'} />
                    </div>
                    <div className={'carousel-content'}>
                        <img className={'carousel-img'} width={'80%'} height={'auto'} src={'/doodle_background.png'} alt={'img'} />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default MainPanel
