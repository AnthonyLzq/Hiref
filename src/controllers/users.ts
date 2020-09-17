import { CustomNodeJSGlobal } from '../custom/global'

declare const global: CustomNodeJSGlobal

class Users {
  private _args: Record<string, unknown>[]
  private _usersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor () {
    this._args = []
    this._usersRef = global.firestoreDatabase.collection('users')
  }

  public process (
    type: string
  ): Promise<Record<string, unknown>[]> | undefined {
    switch (type) {
      case 'getAllClients':
        return this._getAllClients()
      case 'getAllSupervisors':
        return this._getAllSupervisors()
      default:
        return undefined
    }
  }

  private async _getAllClients (): Promise<Record<string, unknown>[]> {
    const result = await this._usersRef.where('role', '==', 'client').get()

    result.docs.map(doc => this._args.push({ id: doc.id, ...doc.data() }))

    return this._args
  }

  private async _getAllSupervisors (): Promise<Record<string, unknown>[]> {
    const result = await this._usersRef.where('role', '==', 'supervisor').get()

    result.docs.map(doc => this._args.push({ id: doc.id, ...doc.data() }))

    return this._args
  }
}

export { Users }
