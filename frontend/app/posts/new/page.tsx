'use client'
import { useRouter } from 'next/navigation'
import { createPost } from '@/lib/api/posts.api'

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
    <main>
      <h1>Neuer Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel</label>
          <input name="title" required />
        </div>
        <div>
          <label>Inhalt</label>
          <textarea name="content" required />
        </div>
        <button type="submit">Erstellen</button>
      </form>
    </main>
  )
}