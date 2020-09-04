import { Document, model, Schema } from 'mongoose'

interface Info {
  description: string,
  period     : [Date, Date],
  place      : [string, string],
  title      : string
}

interface AcademicInfo extends Info {
  institution: string
}

interface LaborInfo extends Info {
  company : string,
  position: string
}

interface IAspirants extends Document {
  academicInfo?   : AcademicInfo,
  address?        : string,
  birthday        : Date,
  categories?     : string[],
  completedWorks? : number,
  dni             : string,
  dniImageObverse?: Float32Array,
  dniImageReverse?: Float32Array,
  email           : string,
  failedWorks?    : number,
  gender?         : string,
  laborInfo       : LaborInfo,
  lastNames       : string,
  names           : string,
  password        : string,
  phone           : string,
  ratings?        : number[],
  subCategories?  : string[],
}

const InfoSchema = new Schema(
  {
    company    : String,
    description: {
      required: true,
      type    : String
    },
    institution: String,
    period     : {
      required: true,
      type    : [Date]
    },
    place: {
      required: true,
      type    : [String, String]
    },
    position: String,
    title   : {
      required: true,
      type    : String
    }
  }
)

const Aspirants = new Schema(
  {
    academicInfo: [InfoSchema],
    address     : String,
    birthday    : {
      required: true,
      type    : Date
    },
    categories    : [String],
    completedWorks: Number,
    dni           : {
      maxlength: 8,
      minlength: 8,
      required : true,
      type     : String
    },
    dniImageObverse: [Number],
    dniImageReverse: [Number],
    // TODO: get in lower case from the frontend
    email          : {
      required: true,
      type    : String
    },
    failedWorks: Number,
    gender     : {
      maxlength: 1,
      type     : String
    },
    // TODO: get in tittle case from the frontend
    lastNames: {
      required: true,
      type    : String
    },
    // TODO: get in tittle case from the frontend
    names: {
      required: true,
      type    : String
    },
    password: {
      required: true,
      type    : String
    },
    phone: {
      maxlength: 9,
      minlength: 9,
      required : true,
      type     : String
    },
    ratings      : [Number],
    subCategories: [String]
  }
)

const AspirantsModel = model<IAspirants>('aspirants', Aspirants)

export { IAspirants, AspirantsModel }
