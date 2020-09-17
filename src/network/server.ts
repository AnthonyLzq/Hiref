import express from 'express'
import morgan from 'morgan'
import { applyRoutes } from './routes'
import { firebaseConnection } from '../database/firebase'
import { mongoConnection } from '../database/mongo'
import { mysqlConnection } from '../database/mysql'

class Server {
  public app                 : express.Application
  private _firebaseConnection: (() => void) |undefined
  private _mongoConnection   : (() => void) | undefined
  private _mysqlConnection   : (() => void) | undefined

  constructor () {
    this.app = express()
    this._config()
  }

  private _config () {
    this.app.set('port', process.env.PORT as string || '3000')
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        next()
      }
    )
    applyRoutes(this.app)
  }

  private _firebase (): void {
    this._firebaseConnection = firebaseConnection
    this._firebaseConnection()
  }

  private _mongo (): void {
    this._mongoConnection = mongoConnection
    this._mongoConnection()
  }

  private _mysql (): void {
    this._mysqlConnection = mysqlConnection
    this._mysqlConnection()
  }

  public start (): void {
    this.app.listen(this.app.get('port'), () =>
      console.log(`Server running at port ${this.app.get('port')}.`)
    )

    try {
      this._firebase()
      this._mongo()
      this._mysql()
    } catch (error) {
      console.error(error)
    }
  }
}

const server = new Server()

export { server as Server }
