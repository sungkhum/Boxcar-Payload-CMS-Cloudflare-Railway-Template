import type { Field } from 'payload'

export const legacyField: Field = {
  name: 'legacy',
  type: 'group',
  label: 'Legacy WordPress',
  admin: {
    position: 'sidebar',
    description: 'Populated by the WP migration script — do not edit manually.',
  },
  fields: [
    {
      name: 'wpId',
      type: 'number',
      index: true,
      admin: { description: 'Original WordPress post/page/comment ID' },
    },
    {
      name: 'wpUrl',
      type: 'text',
      admin: { description: 'Original WordPress permalink (used to build redirects)' },
    },
  ],
}
