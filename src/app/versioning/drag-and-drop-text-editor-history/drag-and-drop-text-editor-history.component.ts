import {Component, OnInit} from '@angular/core';
import {EditorService} from "../../service/editor.service";
import TextEditorContent from "../../dto/TextEditorContent";
import {DiffEditorModel} from "ngx-monaco-editor";

@Component({
  selector: 'app-drag-and-drop-text-editor-history',
  templateUrl: './drag-and-drop-text-editor-history.component.html',
  styleUrls: ['./drag-and-drop-text-editor-history.component.scss']
})
export class DragAndDropTextEditorHistoryComponent implements OnInit {
  availableContents: TextEditorContent[];

  selectedContents: TextEditorContent[];

  draggedContent: TextEditorContent;

  Math = Math;
  showDiffPanel = false;


  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  options = {
    theme: 'vs',
    wordWrap: true,
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };

  constructor(
    private editorService: EditorService
  ) { }

  ngOnInit() {
    this.selectedContents = [];
    this.availableContents = this.editorService.getAllTextContents();
  }

  dragStart(event: any, content: TextEditorContent) {
    this.draggedContent = content;
  }

  drop(event: any) {
    if (this.draggedContent) {
      let draggedContentSelected = this.findIndex(this.draggedContent);
      this.selectedContents = [...this.selectedContents, this.draggedContent];
      this.availableContents = this.availableContents.filter((val, i) => i!=draggedContentSelected);
      // @ts-ignore
      this.draggedContent = null;
    }
  }

  dragEnd(event: any) {
    // @ts-ignore
    this.draggedContent = null;
  }

  removeSelectedItem(content: TextEditorContent) {
    if(this.selectedContents) {
      this.selectedContents = this.selectedContents.filter(s => s != content);
      this.availableContents = [... this.availableContents, content]
      //order
    }
  }

  findIndex(content: TextEditorContent) {
    let index = -1;
    for(let i = 0; i < this.availableContents.length; i++) {
      if (content === this.availableContents[i]) {
        index = i;
        break;
      }
    }
    return index;
  }

  diff() {
    this.showDiffPanel = true;

    const left = this.selectedContents[0]._rawContent;
    const right = this.selectedContents[1]._rawContent;

    this.originalModel = {
      code: left,
      language: 'text/plain'
    };
    this.modifiedModel = {
      code: right,
      language: 'text/plain'
    };

    console.log(this.originalModel.code)
    console.log(this.modifiedModel.code)
  }


}
