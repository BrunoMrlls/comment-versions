
export default class TextEditorContent {

  constructor(
              public version: number
              , public fullContent: string
              , public _rawContent: string
              , public user: string
              , public date: Date) {
  }

}
