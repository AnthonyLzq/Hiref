/* eslint-disable no-extra-parens */
import firestore from '@google-cloud/firestore'
import { CustomNodeJSGlobal } from '../custom/global'
import { DtoProjects } from '../dto-interfaces/projects.dto'
import { IProjects } from '../models/projects'
import { Projects } from './projects'

declare const global: CustomNodeJSGlobal

class Users {
  private _args: Record<string, unknown>[] | string
  private _usersRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >

  constructor (args: Record<string, unknown> | string | null = null) {
    if (!args) this._args = []
    else this._args = args as string
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
      case 'getSupervisorsByProject':
        return this._getSupervisorsByProject()
      default:
        return undefined
    }
  }

  private async _getAllClients (): Promise<Record<string, unknown>[]> {
    const result = await this._usersRef.where('role', '==', 'client').get()

    result.docs.map(doc => {
      return (this._args as Record<string, unknown>[]).push({
        ...doc.data(),
        id: doc.id
      })
    })

    return this._args as Record<string, unknown>[]
  }

  private async _getAllSupervisors (): Promise<Record<string, unknown>[]> {
    const result = await this._usersRef.where('role', '==', 'supervisor').get()

    result.docs.map(doc => {
      return (this._args as Record<string, unknown>[]).push({
        ...doc.data(),
        id: doc.id
      })
    })

    return this._args as Record<string, unknown>[]
  }

  private async _getSupervisorsByProject (): Promise<
    Record<string, unknown>[]
  > {
    const id = this._args as string
    const pc = new Projects({ id } as DtoProjects)
    try {
      const ids = await pc.process('getSupervisorsIdByProject')
      const supervisors = await this._usersRef.where(
        firestore.FieldPath.documentId(),
        'in',
        (ids as IProjects).supervisors
      ).get()

      const result: Record<string, unknown>[] = []
      console.log(supervisors.size)
      supervisors.docs.map(doc => {
        return (result as Record<string, unknown>[]).push({
          ...doc.data(),
          id: doc.id
        })
      })

      return result
    } catch (error) {
      console.error(error)
      throw new Error('idk')
    }
  }
}


export { Users }
