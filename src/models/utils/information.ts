import { Schema } from 'mongoose'

const Information = new Schema(
  {
    content: {
      required: true,
      type    : String
    },
    title: {
      required: true,
      type    : String
    }
  },
  {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id: false
  }
)

export { Information }
