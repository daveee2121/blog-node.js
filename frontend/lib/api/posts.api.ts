const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`

export async function getAllPosts() {
  const res = await fetch(BASE_URL)
  return res.json()
}

export async function getPostById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return res.json()
}

export async function createPost(title: string, content: string) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
}

export async function updatePost(id: string, title: string, content: string) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
}

export async function deletePost(id: string) {
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
}