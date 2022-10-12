import { Link, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { getPostListItems } from '~/models/post.server'

export async function loader() {
  const posts = await getPostListItems()
  return json({ posts })
  // return json({ posts: posts.map((p) => ({ slug: p.slug, title: p.title })) })
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main className="container mx-auto">
      <h1>Posts</h1>
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
