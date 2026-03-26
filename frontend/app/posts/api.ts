import type { Post } from '@/types/post'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`

export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error(`Fehler beim Laden der Posts (${res.status})`)
  return res.json()
}

export async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error(`Post nicht gefunden (${res.status})`)
  return res.json()
}

export async function createPost(title: string, content: string): Promise<Post> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  if (!res.ok) throw new Error(`Fehler beim Erstellen des Posts (${res.status})`)
  return res.json()
}

export async function updatePost(id: string, title: string, content: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  if (!res.ok) throw new Error(`Fehler beim Aktualisieren des Posts (${res.status})`)
  return res.json()
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Fehler beim Löschen des Posts (${res.status})`)
}
