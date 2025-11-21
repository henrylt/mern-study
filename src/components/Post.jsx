import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
export function Post({
  title,
  contents,
  author,
  /* _id,*/
  id,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        // <Link to={`/posts/${_id}/${slug(title)}`}>
        <Link to={`/posts/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && <div>{contents}</div>}
      {author && (
        <em>
          {fullPost && <br />}
          {/* Written by <User id={author} /> */}
          Written by <User {...author} />
        </em>
      )}
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  // author: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  // _id: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}
