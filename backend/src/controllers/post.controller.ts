import { Request, Response } from 'express'
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../services/post.service'

export async function getAll(req: Request, res: Response) {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch {
    res.status(500).json({ error: 'Fehler beim Laden der Posts' })
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const post = await getPostById(parseInt(req.params.id as string))
    if (!post) return res.status(404).json({ error: 'Not found' })
    res.json(post)
  } catch {
    res.status(500).json({ error: 'Fehler beim Laden des Posts' })
  }
}

export async function create(req: Request, res: Response) {
  try {
    const post = await createPost(req.body.title, req.body.content)
    res.json(post)
  } catch {
    res.status(500).json({ error: 'Fehler beim Erstellen des Posts' })
  }
}

export async function update(req: Request, res: Response) {
  try {
    const post = await updatePost(parseInt(req.params.id as string), req.body.title, req.body.content)
    res.json(post)
  } catch {
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Posts' })
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await deletePost(parseInt(req.params.id as string))
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Fehler beim Löschen des Posts' })
  }
}
