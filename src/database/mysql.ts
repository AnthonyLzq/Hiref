import knex from 'knex'
import { CustomNodeJSGlobal } from '../custom/global'

declare const global: CustomNodeJSGlobal

const config = {
  client    : 'mysql',
  connection: {
    database: process.env.MYSQL_DATABASE,
    host    : process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASS,
    user    : process.env.MYSQL_USER
  }
}

const mysqlConnection = async (): Promise<void> => {
  global.mysqlDatabase = knex(config)
  try {
    await global.mysqlDatabase.raw(`SELECT 'test connection';`)
    console.log('MySql connection established.')
  } catch (error) {
    console.error(error)
  }
}

export { mysqlConnection }
