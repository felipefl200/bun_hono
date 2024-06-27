import { z } from 'zod'

export const ExpenseSchema = z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number(),
    date: z.string(),
})

export const createExpenseSchema = ExpenseSchema.omit({ id: true })
