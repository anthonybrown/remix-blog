import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getPostListItems } from '~/models/post.server'

export const loader = async () => {
  return json({
    posts: await getPostListItems(),
  })
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main className="container mx-auto sm:max-w-xl">
      <h1 className="my-4 text-4xl">Posts</h1>
      <Link
        to="admin"
        className="mb-4 pb-4 font-semibold text-red-700 underline"
      >
        Admin
      </Link>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
