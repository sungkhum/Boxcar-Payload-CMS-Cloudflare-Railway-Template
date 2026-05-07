export const dynamic = 'force-dynamic'

export const GET = () =>
  Response.json({ ok: true, ts: new Date().toISOString() })
