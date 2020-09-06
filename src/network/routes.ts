import { Application, Router } from 'express'
import { Home } from '../routes/home'
import { Projects } from '../routes/projects'
import { Tasks } from '../routes/tasks'

const routers = [ Projects, Tasks ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
