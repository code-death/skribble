import {createSlice, configureStore} from '@reduxjs/toolkit'
import userList from "../pages/GameRoom/components/UserList.jsx";

const roomSlice = createSlice({
    name: 'skribble',
    initialState: {
        roomId: '',
        user: {},
        userList: []
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
                if(user.id !== action.id) {
                    newList.push(user);
                }
            })
            state.userList = newList;
        }
    }
})

export const {setRoomId, setUserInfo, updateActiveUserList, removeUser} = roomSlice.actions

const store = configureStore({
    reducer: roomSlice.reducer
})

export default store;
