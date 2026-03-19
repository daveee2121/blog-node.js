import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post.routes'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use('/api/posts', postRoutes)

app.listen(4000, () => {
  console.log('Server läuft auf Port 4000')
})