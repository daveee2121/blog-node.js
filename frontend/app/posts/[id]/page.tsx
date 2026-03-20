'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { usePost } from '@/hooks/usePost'
import { deletePost } from '@/lib/api/posts.api'
import { Button, buttonVariants } from '@/components/ui/button'

export default function PostDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { post, loading, error } = usePost(id as string)

  async function handleDelete() {
    await deletePost(id as string)
    router.push('/posts')
  }

  if (loading) return <p className="text-muted-foreground">Laden...</p>
  if (error) return <p className="text-destructive">{error}</p>
  if (!post) return <p className="text-muted-foreground">Post nicht gefunden.</p>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-1">
          {new Date(post.createdAt).toLocaleDateString('de-DE')}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
      </div>

      <p className="text-base leading-relaxed">{post.content}</p>

      <div className="flex items-center gap-2 pt-4 border-t">
        <Link href="/posts" className={buttonVariants({ variant: 'outline' })}>Zurück</Link>
        <Link href={`/posts/${id}/edit`} className={buttonVariants({ variant: 'outline' })}>Bearbeiten</Link>
        <Button variant="destructive" onClick={handleDelete}>Löschen</Button>
      </div>
    </div>
  )
}