import {motion} from "framer-motion";
import {Select} from "antd";
import {WordCategories, DrawTime, TotalRounds, TotalHints} from '../../../constants/constant.js'
import {useState} from "react";

const GameSettings = () => {
    const [drawTime, setDrawTime] = useState(80);
    const [wordCategories, setWordCategories] = useState([
        'movies/tv_shows',
        'color',
        'mythology',
    ]);
    const [totalRounds, setTotalRounds] = useState(3);
    const [totalHints, setTotalHints] = useState(1);

    const handleCategoryChange = (e) => {
        setWordCategories(e);
    }

    return (
        <motion.div
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
                    onChange={e => setDrawTime(e)}
                    value={drawTime}
                    options={DrawTime}
                />
            </div>
            <div className={'settings-option'}>
                <p>Rounds</p>
                <Select
                    onChange={e => setTotalRounds(e)}
                    className={'settings-select'}
                    value={totalRounds}
                    options={TotalRounds}
                />
            </div>
            <div className={'settings-option'}>
                <p>Hints</p>
                <Select
                    onChange={e => setTotalHints(e)}
                    className={'settings-select'}
                    value={totalHints}
                    options={TotalHints}
                />
            </div>
            <div className={'settings-option'}>
                <p>Word Categories</p>
                <Select
                    onChange={handleCategoryChange}
                    allowClear
                    mode={"multiple"}
                    className={'settings-select'}
                    value={wordCategories}
                    options={WordCategories}
                />
            </div>

        </motion.div>
    )
}

export default GameSettings
