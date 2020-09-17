import { CustomNodeJSGlobal } from '../custom/global'

declare const global: CustomNodeJSGlobal

class Users {
  private _args: Record<string, unknown>[]

  constructor () {
    this._args = []
  }

  public process (
    type: string
  ): Promise<Record<string, unknown>[]> | undefined {
    switch (type) {
      case 'getAllClients':
        return this._getAllClients()
      default:
        return undefined
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAllClients (): Promise<Record<string, unknown>[]> {
    const usersRef = global.firestoreDatabase.collection('users')

    const result = await usersRef.where('role', '==', 'client').get()

    result.docs.map(doc => this._args.push({ id: doc.id, ...doc.data() }))

    return this._args
  }
}

export { Users }
