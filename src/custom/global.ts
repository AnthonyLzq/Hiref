/* eslint-disable @typescript-eslint/no-explicit-any */
import knex from 'knex'

interface CustomNodeJSGlobal extends NodeJS.Global {
  mysqlDatabase: knex<any, unknown[]>
}

export { CustomNodeJSGlobal }
