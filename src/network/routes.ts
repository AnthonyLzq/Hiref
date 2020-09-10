import { Application, Router } from 'express'
import { Home } from '../routes/home'
import { Jobs } from '../routes/jobs'
import { Projects } from '../routes/projects'
import { Tasks } from '../routes/tasks'

const routers = [ Jobs, Projects, Tasks ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
