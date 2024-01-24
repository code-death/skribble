import {useSelector} from "react-redux";
import {createAvatar} from "@dicebear/core";
import {avataaars} from "@dicebear/collection";
import {motion} from "framer-motion";

const UserCard = ({user, roomId}) => {
    const activeUser = useSelector(state => state.user)

    const avatar = createAvatar(avataaars, {
        size: 128,
        seed: user.name + user.socket
    }).toDataUriSync();

    return (
        <motion.div
            initial={{x: -400, opacity: 0, transform: 'scale(1)'}}
            animate={{x: 0, opacity: 100}}
            whileHover={{ transform: 'scale(1.02)' }}
            transition={{ duration: 0.3 }}

            className={'user-card'}>
            <div className={'user-card-sub'}>
                <p>{'#' + user.rank}</p>
            </div>
            <div className={'user-card-sub'}>
                <p style={{color: activeUser._id === user._id ? '#747bff' : "#1a1a1a"}}>{user.name}</p>
                <p>{user.score}</p>
            </div>
            <div className={'user-avatar-container'}>
                <div className="avatar-background"></div>
                {avatar ? <img className={'user-avatar'} src={avatar} alt={'A'}/> : null}
            </div>
        </motion.div>
    )
}

export default UserCard
