import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { legacyField } from '../fields/legacy'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'authors', 'publishedAt', '_status'],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
    },
    maxPerDoc: 25,
  },
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    slugField('title'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              admin: { description: 'Short summary used in listings and SEO descriptions.' },
            },
            { name: 'content', type: 'richText', required: true },
          ],
        },
        {
          label: 'Meta',
          fields: [
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
            },
            { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
          ],
        },
      ],
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        // Dynamic description: shows "Scheduled — will publish in N days"
        // when set to a future date, otherwise "Publishes immediately."
        components: {
          Description: '/components/admin/PublishedAtDescription',
        },
      },
    },
    legacyField,
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (data?._status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date().toISOString()
          }
        }
        return data
      },
    ],
  },
}
