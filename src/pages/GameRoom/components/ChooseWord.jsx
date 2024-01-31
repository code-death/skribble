const ChooseWord = (props) => {
    return <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', gap: '16px'}} className={'game-settings'}>
        {
            props?.activeUser?.isDrawer ? (
                props?.randomWords.length > 0 ?  props?.randomWords.map(word => <div onClick={() => props.handleChooseWord(word.text)} className={'choose-word'}>
                    {word.text}
                </div>) : null
            ) : (
                <p>Drawer is choosing the word</p>
            )
        }
    </div>
}

export default ChooseWord
