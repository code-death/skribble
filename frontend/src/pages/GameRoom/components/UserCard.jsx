import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createAvatar} from "@dicebear/core";
import {avataaars} from "@dicebear/collection";

const UserCard = ({user, roomId}) => {
    const activeUser = useSelector(state => state.user)

    const avatar = createAvatar(avataaars, {
        size: 128,
        seed: user.name + user.socket
    }).toDataUriSync();

    return (
        <div className={'user-card'}>
            <div className={'user-card-sub'}>
                <p>{'#' + user.rank}</p>
            </div>
            <div className={'user-card-sub'}>
                <p style={{color: activeUser._id === user._id ? '#747bff' : "#1a1a1a"}}>{user.name}</p>
                <p>{user.score}</p>
            </div>
            <div className={'user-avatar-container'}>
                {avatar ? <img className={'user-avatar'} src={avatar} alt={'A'}/> : null}
            </div>
        </div>
    )
}

export default UserCard
