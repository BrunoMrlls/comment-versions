import {Injectable} from '@angular/core';
import TextEditorContent from "../dto/TextEditorContent";

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
    localStorage.setItem(IDENTIFIER, JSON.stringify([...allTextContents, html]))
  }

  getEditorContent() : TextEditorContent {
    const editorContentJson = localStorage.getItem(IDENTIFIER);
    if (editorContentJson) {
      const parse = JSON.parse(editorContentJson) as TextEditorContent[];
      return parse[0];
    }
    const txt = 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Diuretics paradis num copo é motivis de denguis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.'
    return new TextEditorContent(txt, txt, new Date());
  }
}
