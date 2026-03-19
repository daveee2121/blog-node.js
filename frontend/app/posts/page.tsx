'use client'
import Link from 'next/link'
import { usePosts } from '@/hooks/usePosts'

export default function PostsPage() {
  const { posts, loading, error } = usePosts()

  if (loading) return <p>Laden...</p>
  if (error) return <p>{error}</p>

  return (
    <main>
      <h1>Posts</h1>
      <Link href="/posts/new">Neuer Post</Link>
      {posts.length === 0 ? (
        <p>Noch keine Posts vorhanden.</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </main>
  )
}