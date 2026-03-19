Blog Seite mit den Basic Crud Verbindungen zu Postgres Datenbank mithilfe von Route Handler also richtiger API Calls

Ein eingebauter Service damit das Prisma (prisma.findMany, prisma.findUnique, prisma.create usw.) nicht mehr direkt in der Route ist.

Browser
  ↓
hook (usePosts.ts)
  ↓ fetch('/api/posts')
route.ts (app/api/posts/route.ts)
  ↓ getAllPosts()
post.service.ts
  ↓ prisma.post.findMany()
PostgreSQL

- hook - wann und wie werden Daten im Frontend geholt
- route.ts – kümmert sich nur um HTTP (Request empfangen, Response zurückschicken)
- post.service.ts – kümmert sich um alles was mit Daten zu tun hat (Prisma, Business Logik)
- prisma - spricht mit der Datenbank

Die Route weiß nicht mal mehr dass Prisma existiert – sie ruft einfach getAllPosts() auf und gibt das Ergebnis zurück. Wenn du morgen von Prisma zu etwas anderem wechselst, musst du nur den Service ändern, die Route bleibt unberührt.

Aktuelle Struktur 
my-blog/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── posts/
│       ├── page.tsx
│       ├── new/
│       │   └── page.tsx
│       └── [id]/
│           ├── page.tsx
│           └── edit/
│               └── page.tsx
├── lib/
│   ├── prisma.ts
│   └── posts/
│       └── post.service.ts
├── hooks/
│   ├── usePosts.ts
│   └── usePost.ts
├── prisma/
│   └── schema.prisma
└── prisma.config.ts



Node.js Struktur
my-project/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── post.routes.ts
│   │   ├── services/
│   │   │   └── post.service.ts    ← gleich wie bei uns
│   │   └── index.ts               ← Server starten
│   ├── lib/
│   │   └── prisma.ts              ← gleich wie bei uns
│   ├── prisma/
│   │   └── schema.prisma          ← gleich wie bei uns
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── hooks/
    │   │   ├── usePosts.ts        ← gleich wie bei uns
    │   │   └── usePost.ts         ← gleich wie bei uns
    │   ├── pages/
    │   │   ├── PostsPage.tsx
    │   │   ├── PostDetailPage.tsx
    │   │   └── NewPostPage.tsx
    │   └── main.tsx
    └── package.json

Unterschied zu Node.js 
Die Struktur bleibt gleich wir ändern nur routes.ts in diese Syntax


```
import { Router } from 'express'
import { getAllPosts, createPost, deletePost } from '../services/post.service'

const router = Router()

router.get('/', async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
})

router.post('/', async (req, res) => {
  const post = await createPost(req.body.title, req.body.content)
  res.json(post)
})

router.delete('/:id', async (req, res) => {
  await deletePost(parseInt(req.params.id))
  res.json({ success: true })
})

export default router
```

und brauchen dann noch index.ts in der wir den Server starten (passiert bei Next.js automatisch)

```
import express from 'express'
import postRoutes from './routes/post.routes'

const app = express()
app.use(express.json())
app.use('/api/posts', postRoutes)
app.listen(3000)

```