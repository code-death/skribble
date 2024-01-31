import {createSlice, configureStore} from '@reduxjs/toolkit'
import userList from "../pages/GameRoom/components/UserList.jsx";

const roomSlice = createSlice({
    name: 'skribble',
    initialState: {
        roomId: '',
        user: {},
        userList: [],
        isLoading: true,
        socket: '',
        gameStarted: false,
        roomInfo: {
            currentRound: 0,
            totalRounds: 3,
            roundInterval: 80,
            hints: 1,
            wordCategories: [
                'movies/tv_shows',
                'color',
                'mythology',
            ],
        },
        wordOfTheRound: ''
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        updateActiveUserList: (state, action) => {
            state.userList = action.payload;
        },
        removeUser: (state, action) => {
            let newList = [];
            userList.forEach(user => {
                if (user.id !== action.id) {
                    newList.push(user);
                }
            })
            state.userList = newList;
        },
        changeLoadingState: (state, action) => {
            state.isLoading = action.payload;
        },
        setSocketId: (state, action) => {
            state.socket = action.payload
        },
        setRoomInfo: (state, action) => {
            state.roomInfo = action.payload;
        },
        setGameState: (state, action) => {
            state.gameStarted = action.payload
        },
        setWordOfTheRound: (state, action) => {
            state.wordOfTheRound = action.payload
        }
    }
})

export const {
    setRoomId,
    setUserInfo,
    updateActiveUserList,
    removeUser,
    changeLoadingState,
    setSocketId,
    setRoomInfo,
    setGameState,
    setWordOfTheRound
} = roomSlice.actions

const store = configureStore({
    reducer: roomSlice.reducer
})

export default store;
