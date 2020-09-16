/* eslint-disable @typescript-eslint/no-explicit-any */
import knex from 'knex'

interface CustomNodeJSGlobal extends NodeJS.Global {
  firestoreDatabase: FirebaseFirestore.Firestore,
  mysqlDatabase    : knex<any, unknown[]>
}

export { CustomNodeJSGlobal }
