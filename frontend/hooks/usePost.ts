import { useEffect, useState } from 'react'
import { getPostById } from '@/lib/api/posts.api'
import type { Post } from '@/types/post'

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