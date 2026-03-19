import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/api/posts.api'

type Post = {
  id: number
  title: string
  content: string
  createdAt: string
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}