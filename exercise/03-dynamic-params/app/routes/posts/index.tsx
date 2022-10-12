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
    <main className="container mx-auto">
      <h1 className="my-4 text-4xl">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
