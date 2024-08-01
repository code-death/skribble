import {useState} from "react";
import {useNavigate} from "react-router";
import {useSelector} from 'react-redux'
import {showNotification} from "../../../utility/utility.js";
import { v4 as uuidV4 } from 'uuid';
import {setRoomId} from "../../../redux/store.js";

const FormActions = (props) => {
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        if(props.name !== '') {
            props.handleCreateRoom()
        } else {
            showNotification('Enter A Valid Name', 'error');
        }
    }

    const handleJoinRoom = () => {
        if(props.name !== '') {
            if(props?.activeRoomId !== "") {
                props.handleJoinRoom(props.activeRoomId);
            } else {
                props.openRoomModal();
            }
        } else {
            showNotification('Enter A Valid Name', 'error')
        }
    }

    return (
        <div className={'side-panel-form-actions'}>
            <input onChange={e => props.setName(e.target.value)}
                   className={'form-actions-name-input'}
                   value={props.name}
                   placeholder={'Enter your name'}
                   type={"text"}
            />
            <div className={'button-group'}>
                <button onClick={handleJoinRoom} className={'form-actions-button primary'}>
                    {props.activeRoomId ? "Join The Room" : "Join A Room"}
                </button>
                <button disabled={props.activeRoomId} onClick={handleCreateRoom} className={'form-actions-button secondary'}>
                    Create A Room
                </button>
            </div>
        </div>
    )
}

export default FormActions
