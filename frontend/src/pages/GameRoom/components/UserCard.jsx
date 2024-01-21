import {useSelector} from "react-redux";

const UserCard = ({user, roomId}) => {
    const activeUser = useSelector(state => state.user)
    return (
        <div className={'user-card'}>
            <div>
                <p>{'#' + user.rank}</p>
                <p style={{color: '#1a1a1a'}}>{'C'}</p>
            </div>
            <div>
                <p>{user.name}<span> {activeUser._id === user._id ? '(You)' : ''}</span></p>
                <p>{user.score}</p>
            </div>
            <div>
                <p>{user.avatar}</p>
            </div>
        </div>
    )
}

export default UserCard
