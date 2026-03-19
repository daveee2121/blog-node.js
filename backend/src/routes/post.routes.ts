import { Router, Request, Response } from 'express'
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../../lib/posts/post.service'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const posts = await getAllPosts()
  res.json(posts)
})

router.get('/:id', async (req: Request, res: Response) => {
  const post = await getPostById(parseInt(req.params.id as string))
  if (!post) return res.status(404).json({ error: 'Not found' })
  res.json(post)
})

router.post('/', async (req: Request, res: Response) => {
  const post = await createPost(req.body.title, req.body.content)
  res.json(post)
})

router.put('/:id', async (req: Request, res: Response) => {
  const post = await updatePost(parseInt(req.params.id as string), req.body.title, req.body.content)
  res.json(post)
})

router.delete('/:id', async (req: Request, res: Response) => {
  await deletePost(parseInt(req.params.id as string))
  res.json({ success: true })
})

export default router