const BASE_URL = 'http://localhost:4000/api/posts'

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