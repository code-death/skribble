import './css/landing.css'
import SidePanel from "./components/SidePanel.jsx";
import MainPanel from "./components/MainPanel.jsx";

const Landing = ({socket}) => {
    return (
        <div className={'landing-container'}>
            <MainPanel/>
            <SidePanel socket={socket}/>
        </div>
    )
}

export default Landing;
