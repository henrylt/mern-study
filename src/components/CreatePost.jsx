// import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
// import { createPost } from '../api/posts.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'
import { Link } from 'react-router-dom'
import slug from 'slug'
export function CreatePost() {
  const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')
  const [token] = useAuth()
  const [createPost, { loading, data }] = useGraphQLMutation(CREATE_POST, {
    variables: { title, contents },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
  })
  // const queryClient = useQueryClient()
  // const createPostMutation = useMutation({
  //   mutationFn: () => createPost(token, { title, contents }),
  //   onSuccess: () => queryClient.invalidateQueries(['posts']),
  // })
  const handleSubmit = (e) => {
    e.preventDefault()
    // createPostMutation.mutate()
    createPost()
  }
  if (!token) return <div>Please log in to create new posts</div>
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>

        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      {/* <div>
        <label htmlFor='create-author'>Author: </label>

        <input
          type='text'
          name='create-author'
          id='createauthor'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br /> */}

      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />

      <input
        type='submit'
        // value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        // disabled={!title || createPostMutation.isPending}
        value={loading ? 'Creating...' : 'Create'}
        disabled={!title || loading}
      />

      {/* {createPostMutation.isSuccess ? ( */}
      {data?.createPost ? (
        <>
          <br />
          Post
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>
          created successfully!
        </>
      ) : null}
    </form>
  )
}
