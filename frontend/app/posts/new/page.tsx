'use client'
import { useRouter } from 'next/navigation'
import { createPost } from '@/lib/api/posts.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function NewPostPage() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createPost(
      formData.get('title') as string,
      formData.get('content') as string
    )
    router.push('/posts')
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Neuer Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Titel</Label>
          <Input id="title" name="title" placeholder="Titel des Posts" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Inhalt</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Schreibe deinen Post..."
            className="min-h-40 resize-none"
            required
          />
        </div>
        <Button type="submit" className="self-start">Erstellen</Button>
      </form>
    </div>
  )
}