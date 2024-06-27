import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { expensesRoutes } from './routes/expenses'

const app = new Hono({
    
})

app.use('*', logger())

app.route('/api/expenses', expensesRoutes)

// app.get('*', serveStatic({ root: '../front-react/dist' }))
// app.get('*', serveStatic({ path: '../front-react/dist/index.html' }))

export default app 
