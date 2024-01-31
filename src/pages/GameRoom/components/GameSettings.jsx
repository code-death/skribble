import {motion} from "framer-motion";
import {Select} from "antd";
import {WordCategories, DrawTime, TotalRounds, TotalHints} from '../../../constants/constant.js'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setRoomInfo} from "../../../redux/store.js";

const GameSettings = () => {
    const [drawTime, setDrawTime] = useState(80);
    const [wordCategories, setWordCategories] = useState([
        'movies/tv_shows',
        'color',
        'mythology',
    ]);
    const [totalRounds, setTotalRounds] = useState(3);
    const [totalHints, setTotalHints] = useState(1);

    const dispatch = useDispatch();

    const activeUser = useSelector(state => state.user);
    const roomInfo = useSelector(state => state.roomInfo);

    const handleCategoryChange = (e) => {
        setWordCategories(e);
    }

    const handleChangeData = (e, key) => {
        let room = {...roomInfo};
        room[key] = e;
        dispatch(setRoomInfo(room));
    }

    return (
        activeUser?.isHost ? <motion.div
            initial={{y: 0, x: 0, opacity: 0}}
            animate={{x: 0, y: 0, opacity: 100}}
            transition={{
                duration: 1,
                ease: 'easeInOut'
            }}
            className={'game-settings'}
        >
            <div className={'settings-option'}>
                <p>Draw time</p>
                <Select
                    className={'settings-select'}
                    onChange={e => handleChangeData(e, 'roundInterval')}
                    value={roomInfo.roundInterval}
                    options={DrawTime}
                />
            </div>
            <div className={'settings-option'}>
                <p>Rounds</p>
                <Select
                    onChange={e => handleChangeData(e, 'totalRounds')}
                    className={'settings-select'}
                    value={roomInfo.totalRounds}
                    options={TotalRounds}
                />
            </div>
            <div className={'settings-option'}>
                <p>Hints</p>
                <Select
                    onChange={e => handleChangeData(e, 'hints')}
                    className={'settings-select'}
                    value={roomInfo.hints}
                    options={TotalHints}
                />
            </div>
            <div className={'settings-option'}>
                <p>Word Categories</p>
                <Select
                    onChange={e => handleChangeData(e, 'wordCategories')}
                    allowClear
                    mode={"multiple"}
                    className={'settings-select'}
                    value={roomInfo.wordCategories}
                    options={WordCategories}
                />
            </div>

        </motion.div> :
            <motion.div
                initial={{y: 0, x: 0, opacity: 0}}
                animate={{x: 0, y: 0, opacity: 100}}
                transition={{
                    duration: 1,
                    ease: 'easeInOut'
                }}
                className={'game-settings'}
            >

            </motion.div>
    )
}

export default GameSettings
