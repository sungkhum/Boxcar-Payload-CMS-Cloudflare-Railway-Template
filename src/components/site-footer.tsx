export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 px-6 py-8 font-sans text-sm text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} boxcar</span>
        <span className="tabular">
          Built with{' '}
          <a
            href="https://payloadcms.com"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Payload
          </a>
        </span>
      </div>
    </footer>
  )
}
