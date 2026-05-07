import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { legacyField } from '../fields/legacy'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'post', 'approved', 'createdAt'],
  },
  access: {
    // Public sees only approved comments; authenticated users see everything
    // (so the admin can moderate the queue).
    read: ({ req: { user } }) => {
      if (user) return true
      return { approved: { equals: true } }
    },
    // Anyone can submit a comment. Default approved=false enforces moderation.
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'authorName', type: 'text', required: true, maxLength: 120 },
    { name: 'authorEmail', type: 'email', required: true },
    { name: 'authorUrl', type: 'text' },
    { name: 'content', type: 'textarea', required: true, maxLength: 4000 },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'comments',
      admin: { description: 'Optional — set when this comment replies to another.' },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    legacyField,
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Anonymous public submissions can never self-approve.
        if (operation === 'create' && !req.user) {
          data.approved = false
        }
        return data
      },
    ],
  },
}
