/**
 * WordPress → Payload migration script.
 *
 * Status: stub. Implementation will pull from the WP REST API
 *   ($WP_SOURCE_URL/wp-json/wp/v2/{posts,pages,media,comments,categories,tags})
 * and create matching documents in Payload via the local API, preserving slugs
 * and recording the original WP id + URL in the `legacy` group field.
 *
 * Run with: pnpm migrate:wp
 */
import 'dotenv/config'
import config from '../src/payload.config'
import { getPayload } from 'payload'

async function main() {
  const payload = await getPayload({ config })

  payload.logger.info('WP migration: not implemented yet')
  payload.logger.info('Planned steps:')
  payload.logger.info('  1. Fetch categories + tags, create in Payload (track wpId)')
  payload.logger.info('  2. Fetch and re-upload media to R2, save to media collection')
  payload.logger.info('  3. Fetch posts + pages, rewrite media URLs, create in Payload')
  payload.logger.info('  4. Fetch comments, link to posts via legacy.wpId lookup')
  payload.logger.info('  5. Generate redirect map from legacy.wpUrl → new slug')

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
