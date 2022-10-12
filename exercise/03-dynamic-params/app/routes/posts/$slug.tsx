import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import { getPost } from '~/models/post.server'

export async function loader({ params }: LoaderArgs) {
  if (!params.slug) {
    throw new Error('Missing slug balls')
  }
  const post = await getPost(params.slug)
  if (!post) {
    throw new Error('Post not found numbnuts!')
  }
  const html = marked(post.markdown)
  return json({ title: post.title, html })
}

export default function PostRoute() {
  const { title, html } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div
        className="container mx-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
