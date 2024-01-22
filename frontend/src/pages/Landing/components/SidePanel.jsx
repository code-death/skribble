import CharacterSelection from "./CharacterSelection.jsx";
import FormActions from "./FormActions.jsx";
import {Modal} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router";
import {showNotification} from "../../../utility/utility.js";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidV4} from "uuid";
import {changeLoadingState, setRoomId as setRoom, setUserInfo} from "../../../redux/store.js";

const SidePanel = ({socket}) => {
    const [roomJoinModalOpen, setRoomJoinModal] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeRoomId = useSelector(state => state.roomId);

    const openRoomModal = () => {
        setRoomJoinModal(true)
    }

    const closeRoomModal = () => {
        setRoomJoinModal(false);
        setRoomId('')
    }

    const handleJoinRoom = (roomId) => {
        if(roomId !== '') {
            let user = {
                name,
                id: uuidV4(),
                isHost: false,
                isDrawer: false,
                socket: socket.id
            };

            if(roomId.includes('roomId')) {
                let tempId = roomId.slice(roomId.indexOf('=')+1);
                socket.emit('join-room', user, tempId);
                dispatch(setRoom(tempId));
                dispatch(setUserInfo(user));
                dispatch(changeLoadingState(true));
                navigate(`/play?roomId=${tempId}`)
            } else {
                socket.emit('join-room', user, roomId);
                dispatch(setRoom(roomId));
                dispatch(setUserInfo(user));
                dispatch(changeLoadingState(true));
                navigate(`/play?roomId=${roomId}`)
            }
        } else {
            showNotification('Enter Valid Room Id/URL', 'error')
        }
    }

    const handleCreateRoom = () => {
        let user = {
            name,
            isHost: true,
            isDrawer: true,
            rank: 1,
            score: 0,
            socket: socket.id,
        };


        let roomId = uuidV4();
        dispatch(setRoom(roomId));
        dispatch(setUserInfo(user))
        dispatch(changeLoadingState(true));

        socket.emit('create-room', user, roomId);

        navigate(`/play?roomId=${roomId}`)
    }

    return(
        <div className={'landing-side-panel'}>
            <Modal
                destroyOnClose={true}
                title={'Join A Room'}
                open={roomJoinModalOpen}
                onCancel={closeRoomModal}
                onOk={() => handleJoinRoom(roomId)}
            >
                <input onChange={e => setRoomId(e.target.value)}
                       className={'form-actions-name-input'}
                       style={{border: '1px solid #000', marginBottom: '32px', width: '93%'}}
                       value={roomId}
                       placeholder={'Enter Room Id / Joining URL'}
                       type={"text"}
                />
            </Modal>
            <h1 style={{textAlign: 'center'}}>Play Skribble !</h1>
            <CharacterSelection
                socket={socket}
                seed={name}
            />
            <FormActions
                handleJoinRoom={handleJoinRoom}
                activeRoomId={activeRoomId}
                name={name}
                setName={setName}
                handleCreateRoom={handleCreateRoom}
                dispatch={dispatch}
                openRoomModal={openRoomModal}
                closeRoomModal={closeRoomModal}
            />
        </div>
    )
}

export default SidePanel;
