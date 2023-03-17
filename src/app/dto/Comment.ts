export class Comment {

  constructor(
    public user?: string
    , public text?: string
    , public from?: number
    , public  to?: number
    , public datetime?: Date
    , public datetimeAsString?: string
    ,public message: string = ''
  ) {}


}
