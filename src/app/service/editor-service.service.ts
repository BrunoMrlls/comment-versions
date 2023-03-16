import { Injectable } from '@angular/core';
import {toDoc, toHTML} from "ngx-editor";

@Injectable({
  providedIn: 'root'
})
export class EditorServiceService {

  constructor() { }

  saveEditorContent(html: string) {
    localStorage.removeItem('editorContent')
    localStorage.setItem('editorContent', JSON.stringify(toDoc(html)))
  }

  getEditorContent() : string {
    const editorContentJson = localStorage.getItem('editorContent');
    if (editorContentJson) {
      return toHTML(JSON.parse(editorContentJson));
    }
    return 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Diuretics paradis num copo é motivis de denguis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.';
  }
}
