import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          boxcar
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/posts"
            className="px-3 py-2 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Posts
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
