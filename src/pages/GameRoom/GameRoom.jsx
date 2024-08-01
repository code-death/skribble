import Navigation from "./components/Navigation.jsx";
import './css/GameRoom.css'
import {useEffect, useRef, useState} from "react";
import UserList from "./components/UserList.jsx";
import DrawingBoard from "./components/DrawingBoard.jsx";
import ChatBox from "./components/ChatBox.jsx";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeLoadingState, setRoomId, setUserInfo, updateActiveUserList, setGameState, setRoomInfo} from "../../redux/store.js";
import _ from "lodash";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const GameRoom = ({socket}) => {
    const canvasRef = useRef(null);
    const ctx = useRef(null);

    const [elements, setElements] = useState([]);
    const [historyElements, setHistoryElements] = useState([])
    const [roundTimer, setRoundTimer] = useState(80);
    const [params, setParams] = useSearchParams();
    const [chatThread, setChatThread] = useState([])

    const user = useSelector(state => state.user);
    const roomId = useSelector(state => state.roomId);
    const room = useSelector(state => state.roomInfo);
    const userList = useSelector(state => state.userList);
    const socketId = useSelector(state => state.socket)
    const gameStarted = useSelector(state => state.gameStarted);
    const roundInfo = useSelector(state => state.roomInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (answer, color) => {
        let chat = {};
        chat.text = answer;
        chat.userName = user.name;
        chat.userId = user._id;
        chat.userSocket = user.socket;
        chat.color = color ? color : 'black';

        if(!room.turnGoingOn || (room.turnGoingOn && (user?.turnScore && user.turnScore !== 0))) {
            socket.emit('send-message', chat, roomId);
        } else {
            socket.emit('guess-word', chat, roomId)
        }

        
    }

    useEffect(() => {
        if (roomId && user) {

        } else {
            let roomId = params.get('roomId');
            dispatch(setRoomId(roomId));
            let user = JSON.parse(window.sessionStorage.getItem('user'));

            if (roomId && roomId !== '' && user && !_.isEmpty(user)) {
                    dispatch(setUserInfo({...user, socket: socketId}))
                    window.sessionStorage.setItem('user', JSON.stringify({...user, socket: socketId}));
                    socket.emit('join-room', user, roomId);
            } else {
                navigate('/');
                toast.warn('Write a name first')
            }
        }
    }, [params]);


    useEffect(() => {
        socket.on('joined-room', (response, joined_user) => {
            if(response.users && response.users.length !== 0) {
                dispatch(updateActiveUserList(response.users));
            }

            if(joined_user && !_.isEmpty(joined_user) && user.socket === joined_user.socket) {
                dispatch(setUserInfo(joined_user));
                window.sessionStorage.setItem('user', JSON.stringify(joined_user));
                dispatch(changeLoadingState(false));
            }
        });

        socket.on('left-room', (response, left_user) => {
            if(response && !_.isEmpty(response) && response.users && !_.isEmpty(response.users)) {
                dispatch(updateActiveUserList(response.users));
                if(left_user. _id === user._id) {
                    dispatch(setUserInfo({}));
                    window.sessionStorage.removeItem('user');
                }
            }
        });

        socket.on('round-ended', (res) => {
            console.log(res);
        })

        socket.on('game-started', (res) => {
            if(!_.isEmpty(res)) {
                dispatch(setRoomInfo(res));
                dispatch(setGameState(true));
                dispatch(setRoundTimer(3));
                res?.users.forEach(resUser => {
                    if(resUser?.socket === user?.socket || resUser?._id === user?._id) {
                        dispatch(setUserInfo(resUser));
                    }
                });
            }
        })

    }, []);

    useEffect(() => {
        socket.on('receive_message', (response) => {
            if (response?.text !== '') {
                setChatThread(prev => [...prev, {text: response.text, userName: response.userName, color: response.color}]);
            }
        });
    }, []);


    return (
        <div className={'game-room-container'}>
            <Navigation
                activeUser={user}
                roundTimer={roundTimer}
                gameStarted={gameStarted}
                roundInfo={roundInfo}
            />
            <div className={'game-area'}>
                <UserList
                    roomId={roomId}
                    users={userList}
                />
                <DrawingBoard
                    roomId={roomId}
                    socket={socket}
                    historyElements={historyElements}
                    setHistoryElements={setHistoryElements}
                    elements={elements}
                    setElements={setElements}
                    canvasRef={canvasRef}
                    ctxRef={ctx}
                />
                <ChatBox
                    chatThread={chatThread}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default GameRoom;
