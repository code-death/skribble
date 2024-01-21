import { createAvatar } from '@dicebear/core';
import {avataaars} from '@dicebear/collection';
import {useEffect, useMemo, useState} from "react";

const CharacterSelection = (props) => {
    const [seed, setSeed] = useState(props.seed);

    useEffect(() => {
        setSeed(props.seed)
    }, [props.seed]);

    const avatar = createAvatar(avataaars, {
            size: 128,
            seed: seed
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
