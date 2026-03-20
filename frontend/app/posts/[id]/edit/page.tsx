'use client'
import { useParams, useRouter } from 'next/navigation'
import { usePost } from '@/hooks/usePost'
import { updatePost } from '@/lib/api/posts.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  const { post, loading, error } = usePost(id as string)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updatePost(
      id as string,
      formData.get('title') as string,
      formData.get('content') as string
    )
    router.push('/posts')
  }

  if (loading) return <p className="text-muted-foreground">Laden...</p>
  if (error) return <p className="text-destructive">{error}</p>
  if (!post) return <p className="text-muted-foreground">Post nicht gefunden.</p>

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Post bearbeiten</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" name="title" defaultValue={post.title} required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Inhalt</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={post.content}
            className="min-h-40 resize-none"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Speichern</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Abbrechen
          </Button>
        </div>
      </form>
    </div>
  )
}