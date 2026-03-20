import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Willkommen auf meinem Blog</h1>
      <p className="text-muted-foreground text-lg max-w-md">
        Hier schreibe ich über Dinge die mich interessieren.
      </p>
      <Link href="/posts" className={buttonVariants()}>Alle Posts lesen</Link>
    </div>
  )
}