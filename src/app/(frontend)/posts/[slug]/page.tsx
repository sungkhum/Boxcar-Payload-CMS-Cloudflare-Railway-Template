import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { publicPostsWhere } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

const slugWhere = (slug: string) => {
  const base = publicPostsWhere()
  return {
    and: [{ slug: { equals: slug } }, base],
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: slugWhere(slug),
    limit: 1,
  })
  const post = docs[0]
  if (!post) return {}
  return {
    title: `${post.title} — Boxcar`,
    description: post.excerpt || undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: slugWhere(slug),
    limit: 1,
    depth: 2,
  })

  const post = docs[0]
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground stagger-in"
      >
        <span aria-hidden>←</span> All posts
      </Link>

      <header className="mt-8 stagger-in stagger-in-delay-1">
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="font-sans text-sm text-muted-foreground"
          >
            {formatDate(post.publishedAt)}
          </time>
        )}
        <h1 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
        )}
      </header>

      {post.content && (
        <div className="mt-12 stagger-in stagger-in-delay-2 prose-article">
          <RichText data={post.content} />
        </div>
      )}
    </article>
  )
}
