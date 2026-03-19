'use client'
import { useParams, useRouter } from 'next/navigation'
import { usePost } from '@/hooks/usePost'
import { updatePost } from '@/lib/api/posts.api'

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

  if (loading) return <p>Laden...</p>
  if (error) return <p>{error}</p>
  if (!post) return <p>Post nicht gefunden.</p>

  return (
    <main>
      <h1>Post bearbeiten</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel</label>
          <input name="title" defaultValue={post.title} required />
        </div>
        <div>
          <label>Inhalt</label>
          <textarea name="content" defaultValue={post.content} required />
        </div>
        <button type="submit">Speichern</button>
      </form>
    </main>
  )
}