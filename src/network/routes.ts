import { Application, Router } from 'express'
import { Home } from '../routes/home'
import { Tasks } from '../routes/tasks'
import { Users } from '../routes/users'

const routers = [ Tasks, Users ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
