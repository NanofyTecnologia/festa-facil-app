import z from 'zod'

export const experienceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Insira um título'),
  description: z.string().min(1, 'Insira a descrição'),
  serviceDate: z.string(),
  location: z.string(),
  image: z.any().optional(),
})

export type ExperienceData = z.infer<typeof experienceSchema>
