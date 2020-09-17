/* eslint-disable @typescript-eslint/no-explicit-any */
import knex from 'knex'
import { Firestore } from '@google-cloud/firestore'

interface CustomNodeJSGlobal extends NodeJS.Global {
  firestoreDatabase: Firestore,
  mysqlDatabase    : knex<any, unknown[]>
}

export { CustomNodeJSGlobal }
