import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
  })
  const page = docs[0]
  if (!page) return {}
  return { title: `${page.title} — Boxcar` }
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 1,
  })

  const page = docs[0]
  if (!page) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <header className="stagger-in">
        <h1 className="text-4xl leading-[1.05] sm:text-5xl">{page.title}</h1>
      </header>
      {page.content && (
        <div className="mt-10 stagger-in stagger-in-delay-1 prose-article">
          <RichText data={page.content} />
        </div>
      )}
    </article>
  )
}
