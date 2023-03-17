import {Injectable} from '@angular/core';
import TextEditorContent from "../dto/TextEditorContent";
import {NamesUtils} from "../utils/NamesUtils";

const IDENTIFIER = 'textEditorContents';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor() { }

  getAllTextContents() : TextEditorContent[] {
    const jsonItems = localStorage.getItem(IDENTIFIER);
    if (jsonItems) {
      const textContents = JSON.parse(jsonItems) as TextEditorContent[];
      textContents.forEach(tc => {
        tc.date = Object.assign(new Date(), tc.date);
      })
      return textContents;
    }
    return [];
  }
  saveEditorContent(html: TextEditorContent) {
    const allTextContents = this.getAllTextContents();
    if (allTextContents) {
      localStorage.removeItem(IDENTIFIER)
    }
    html.version = allTextContents.length+1;
    localStorage.setItem(IDENTIFIER, JSON.stringify([...allTextContents, html]))
  }

  getEditorContent() : TextEditorContent {
    const editorContentJson = localStorage.getItem(IDENTIFIER);
    if (editorContentJson) {
      const parse = JSON.parse(editorContentJson) as TextEditorContent[];
      return parse[parse.length-1];
    }
    const txt = 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Diuretics paradis num copo é motivis de denguis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'

    const names = NamesUtils.NAMES;
    const user = names[Math.floor(Math.random() * names.length)];

    return new TextEditorContent(1, txt, txt, user, new Date());
  }
}
