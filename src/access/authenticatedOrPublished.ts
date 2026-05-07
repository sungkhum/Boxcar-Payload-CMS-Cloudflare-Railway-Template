import type { Access } from 'payload'

// Public reads: only docs that are both `_status: published` AND whose
// `publishedAt` (if set) is now or in the past. A future `publishedAt`
// is the convention for scheduled posts — the doc is saved as
// "published" but invisible to the public until the date arrives.
//
// Authenticated users (admin/editor/author) bypass the gate so they can
// preview scheduled posts via the admin or the live frontend with cookies.
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    and: [
      { _status: { equals: 'published' } },
      {
        or: [
          { publishedAt: { exists: false } },
          { publishedAt: { less_than_equal: new Date().toISOString() } },
        ],
      },
    ],
  }
}
