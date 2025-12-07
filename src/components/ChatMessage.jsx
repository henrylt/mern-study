import PropTypes from 'prop-types'
export function ChatMessage({ room, username, message, replayed }) {
  // room added for join and switch room
  return (
    <div style={{ opacity: replayed ? 0.5 : 1.0 }}>
      {/* <b>{username}</b>: {message} */}
      {username ? (
        <span>
          <code>[{room}]</code> <b>{username}</b>: {message}
          {/* <code>[{room}]</code> added for joining and switching room  */}
        </span>
      ) : (
        <i>{message}</i>
      )}
    </div>
  )
}
ChatMessage.propTypes = {
  // username: PropTypes.string.isRequired,
  username: PropTypes.string,
  message: PropTypes.string.isRequired,
  replayed: PropTypes.bool,
  room: PropTypes.string,
}
