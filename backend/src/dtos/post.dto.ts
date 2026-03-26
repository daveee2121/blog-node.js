// DTOs (Data Transfer Objects) definieren die Form der Request-Daten

export type CreatePostDto = {
  title: string
  content: string
}

export type UpdatePostDto = {
  title: string
  content: string
}
