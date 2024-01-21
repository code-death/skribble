import {
    createNewRoomHandler,
    joinUserToRoomHandler,
    leaveRoomWithSocketId,
    removeUserFromTheGame
} from "./common/handlers/roomHandler";
import {getRoomsToLeaveForaSocket, getSocketInfoByQueryHandler} from "./common/handlers/socketInfoHandler";
import _ from "lodash";

export default function handleSocketEvents(socket, io) {
    socket.on('create-room', async (data, roomId) => {
        if (roomId !== '') {
            socket.join(roomId);
            try {
                let {res, joined_user} = await createNewRoomHandler({user: {...data, socket: socket.id}, roomId});
                io.to(roomId).emit('joined-room', res, joined_user);
            } catch (e) {
                console.log(e);
            }
        }
    })

    socket.on('join-room', async (data, roomId) => {
        if (roomId !== '') {
            socket.join(roomId);

            try {
                let {res, joined_user} = await joinUserToRoomHandler({user: {...data, socket: socket.id}, roomId});

                io.to(roomId).emit('joined-room', res, joined_user);
            } catch (e) {
                console.log(e)
            }
        }
    });

    socket.on('disconnect', async () => {
        let left_socket = socket.id;
        if(left_socket && left_socket !== "") {
            let rooms_to_leave = await getRoomsToLeaveForaSocket(left_socket);

            if(rooms_to_leave && !_.isEmpty(rooms_to_leave)) {
                await Promise.all(rooms_to_leave.map(async roomId => {
                    let {res, left_user} = await leaveRoomWithSocketId(left_socket, roomId);

                    if(left_user && !_.isEmpty(left_user)) {
                        io.to(roomId).emit('left-room', res, left_user);
                    }
                }))
            }
        }
    });


    socket.on('guess-word', (chat, roomId) => {
        if (roomId !== '') {
            socket.to(roomId).emit('receive_message', chat);
        }
    });

    socket.on('start-game', (data, roomId) => {
        if (roomId !== '') {

        }
    })

    socket.on('end-game', (data, roomId) => {
        if (roomId !== '') {

        }
    })

    socket.on('start-round', (data, roomId) => {
        if (roomId !== '') {

        }
    })

    socket.on('end-round', (data, roomId) => {
        if (roomId !== '') {

        }
    })

    socket.on('draw-shape', (elements, roomId) => {
        if (roomId !== '') {
            socket.broadcast.to(roomId).emit('shape-drawn', elements, elements?.[elements.length - 1]?.path?.length);
        }
    })
}