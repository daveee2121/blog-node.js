import { useEffect, useState } from 'react'
import { getPostById } from '@/app/posts/api'
import type { Post } from '@/types/post'

// Nützlich für Client Components die einen einzelnen Post reaktiv laden brauchen
export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setLoading(false))
  }, [id])

  return { post, loading, error }
}
