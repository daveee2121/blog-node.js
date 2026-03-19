'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { usePost } from '@/hooks/usePost'
import { deletePost } from '@/lib/api/posts.api'

export default function PostDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { post, loading, error } = usePost(id as string)

  async function handleDelete() {
    await deletePost(id as string)
    router.push('/posts')
  }

  if (loading) return <p>Laden...</p>
  if (error) return <p>{error}</p>
  if (!post) return <p>Post nicht gefunden.</p>

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href={`/posts/${id}/edit`}>Bearbeiten</Link>
      <button onClick={handleDelete}>Löschen</button>
      <Link href="/posts">Zurück</Link>
    </main>
  )
}