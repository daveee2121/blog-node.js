import { useEffect, useState } from 'react'

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
    fetch('http://localhost:4000/api/posts')
      .then(r => r.json())
      .then(setPosts)
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}