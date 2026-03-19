import { useEffect, useState } from 'react'

type Post = {
  id: number
  title: string
  content: string
  createdAt: string
}

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`http://localhost:4000/api/posts/${id}`)
      .then(r => r.json())
      .then(setPost)
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setLoading(false))
  }, [id])

  return { post, loading, error }
}