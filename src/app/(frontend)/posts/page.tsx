import config from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { publicPostsWhere } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export default async function PostsIndex() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: publicPostsWhere(),
    sort: '-publishedAt',
    limit: 50,
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="stagger-in">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Archive
        </p>
        <h1 className="mt-3 text-4xl leading-[1.05]">All posts</h1>
        {posts.length > 0 && (
          <p className="mt-3 font-sans text-sm text-muted-foreground tabular">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        )}
      </header>

      <ul className="mt-12 divide-y divide-border/60 stagger-in stagger-in-delay-1">
        {posts.map((post) => (
          <li key={post.id} className="py-6">
            <Link href={`/posts/${post.slug}`} className="group block">
              <h2 className="text-xl transition-colors group-hover:text-primary">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-1 leading-relaxed text-muted-foreground">{post.excerpt}</p>
              )}
              {post.publishedAt && (
                <time
                  dateTime={post.publishedAt}
                  className="mt-2 inline-block font-sans text-xs text-muted-foreground"
                >
                  {formatDate(post.publishedAt)}
                </time>
              )}
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="py-6 font-sans text-sm text-muted-foreground">No posts yet.</li>
        )}
      </ul>
    </div>
  )
}
