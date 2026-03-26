'use server'

import { createPost, updatePost, deletePost } from './api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Wird direkt als form action verwendet: <form action={createPostAction}>
export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  await createPost(title, content)
  revalidatePath('/posts')
  redirect('/posts')
}

// .bind(null, id) damit die id mitgegeben wird: action={updatePostAction.bind(null, id)}
export async function updatePostAction(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  await updatePost(id, title, content)
  revalidatePath('/posts')
  revalidatePath(`/posts/${id}`)
  redirect('/posts')
}

// Wird per form action aufgerufen: action={deletePostAction.bind(null, id)}
export async function deletePostAction(id: string) {
  await deletePost(id)
  revalidatePath('/posts')
  redirect('/posts')
}
