import UserCard from "./UserCard.jsx";

const UserList = ({users, roomId}) => {
    return(
        <div className={'user-list'}>
            {
                users && users.length > 0 ? users.map(user => <UserCard key={user._id} user={user} roomId={roomId} />) : null
            }
        </div>
    )
}

export default UserList
