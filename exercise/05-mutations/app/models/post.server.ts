import { prisma } from '~/db.server'

import { Post } from '@prisma/client'

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } })
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } })
}

export async function createPost({
  title,
  slug,
  markdown,
}: Pick<Post, 'title' | 'slug' | 'markdown'>) {
  return prisma.post.create({ data: { title, slug, markdown } })
}
