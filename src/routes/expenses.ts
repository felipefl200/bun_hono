import { Hono } from 'hono'
import type { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { createExpenseSchema, ExpenseSchema } from '../interfaces/ExpenseSchema'

const expenses: z.infer<typeof ExpenseSchema>[] = [
    {
        id: '1',
        name: 'Aluguel',
        amount: 1000,
        date: '2024-06-01',
    },
    {
        id: '2',
        name: 'Supermercado',
        amount: 525,
        date: '2024-06-02',
    },
    {
        id: '3',
        name: 'Gasolina',
        amount: 200,
        date: '2022-01-22',
    },
    {
        id: '4',
        name: 'Faculdade',
        amount: 300,
        date: '2024-06-04',
    },
]

export const expensesRoutes = new Hono()
    .get('/', (c) => {
        return c.json({
            expenses,
        })
    })
    .get('/total-spent', async (c) => {
        const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0)
        return c.json({
            totalSpent,
        })
    })
    .post('/', zValidator('json', createExpenseSchema), async (c) => {
        const data = await c.req.valid('json')
        expenses.push({ id: String(expenses.length + 1), ...data })
        c.status(201)
        return c.json(expenses)
    })
    .get('/:id{[0-9]+}', async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const expense = expenses.find((e) => e.id === String(id))
        if (!expense) {
            return c.notFound()
        }
        return c.json({
            expense,
        })
    })
    .delete('/:id{[0-9]+}', async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const expense = expenses.find((e) => e.id === String(id))
        if (!expense) {
            return c.notFound()
        }
        expenses.splice(expenses.indexOf(expense), 1)
        return c.json({
            expense,
        })
    })
