import type { Where } from 'payload'

/**
 * Where clause for Posts that should be visible to the public:
 * status === 'published' AND publishedAt is now or in the past.
 *
 * A future `publishedAt` is the convention for scheduled posts — the doc
 * is saved as published but invisible until the date arrives. The frontend
 * is `force-dynamic`, so each request re-evaluates `now()` and a scheduled
 * post starts showing automatically once its time passes.
 */
export const publicPostsWhere = (): Where => ({
  and: [
    { _status: { equals: 'published' } },
    {
      or: [
        { publishedAt: { exists: false } },
        { publishedAt: { less_than_equal: new Date().toISOString() } },
      ],
    },
  ],
})
