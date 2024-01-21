import { createAvatar } from '@dicebear/core';
import {avataaars} from '@dicebear/collection';
import {useEffect, useMemo, useState} from "react";
import {v4 as uuidV4} from 'uuid'

const CharacterSelection = (props) => {

    const avatar = createAvatar(avataaars, {
            size: 128,
            seed: (props?.seed !== "" ? props.seed : uuidV4()) + props.socket.id
            // ... other options
        }).toDataUriSync();


    return (
        <div className={'character-selection'}>
            <h4 style={{textAlign: 'center', fontSize: '36px'}}>Your Avatar</h4>
            <img src={avatar} alt={'avatar'} width={'200px'}/>
        </div>
    )
}

export default CharacterSelection
