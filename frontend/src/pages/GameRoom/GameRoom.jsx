import Navigation from "./components/Navigation.jsx";
import './css/GameRoom.css'
import {useEffect, useRef, useState} from "react";
import UserList from "./components/UserList.jsx";
import DrawingBoard from "./components/DrawingBoard.jsx";
import ChatBox from "./components/ChatBox.jsx";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUser, setRoomId, setUserInfo, updateActiveUserList} from "../../redux/store.js";
import io from "socket.io-client";
import _ from "lodash";

const users = [
    {
        name: 'Tom',
        id: '1',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Tim',
        id: '2',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Poorvansh',
        id: '3',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Pokemon',
        id: '4',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Devil',
        id: '5',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Pirate',
        id: '6',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Jack Sparrow',
        id: '7',
        score: '0',
        avatar: 'A',
        rank: 1
    },
    {
        name: 'Dante',
        id: '8',
        score: '0',
        avatar: 'A',
        rank: 1
    },
]

const GameRoom = ({socket}) => {
    const canvasRef = useRef(null);
    const ctx = useRef(null);

    const [elements, setElements] = useState([]);
    const [historyElements, setHistoryElements] = useState([])
    const [roundInfo, setRoundInfo] = useState({currentRound: 1, totalRounds: 3})
    const [gameStarted, setGameStarted] = useState(false);
    const [roundTimer, setRoundTimer] = useState(80);
    const [params, setParams] = useSearchParams();
    const [chatThread, setChatThread] = useState([])

    const user = useSelector(state => state.user);
    const roomId = useSelector(state => state.roomId);
    const userList = useSelector(state => state.userList);

    const dispatch = useDispatch();

    const handleSubmit = (answer, color) => {
        let chat = {};
        chat.text = answer;
        chat.userName = user.name;
        chat.color = color ? color : 'black';

        socket.emit('guess-word', chat, roomId)
    }

    useEffect(() => {
        if (roomId && user) {

        } else {
            let roomId = params.get('roomId');
            let user = JSON.parse(window.sessionStorage.getItem('user'))

            if (roomId && roomId !== '') {
                dispatch(setRoomId(roomId));
                socket.on('connect', () => {
                    dispatch(setUserInfo({...user, socket: socket.id}))
                    window.sessionStorage.setItem('user', JSON.stringify({...user, socket: socket.id}));
                    socket.emit('join-room', user, roomId);
                })
            }
        }
    }, [params]);


    useEffect(() => {
        socket.on('joined-room', (response, joined_user) => {
            if(response.users && response.users.length !== 0) {
                dispatch(updateActiveUserList(response.users));
            }

            if(joined_user && !_.isEmpty(joined_user) && user.socket === joined_user.socket) {
                console.log(joined_user)
                dispatch(setUserInfo(joined_user));
                window.sessionStorage.setItem('user', JSON.stringify(joined_user));
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

    }, []);

    useEffect(() => {
        socket.on('receive_message', (response) => {
            console.log(response)
            if (response?.text !== '') {
                setChatThread(prev => [...prev, {text: response.text, userName: response.userName, color: response.color}]);
            }
        });
    }, []);


    return (
        <div className={'game-room-container'}>
            <Navigation
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
