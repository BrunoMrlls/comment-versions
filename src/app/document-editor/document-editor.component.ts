import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Editor, toDoc, toHTML, Toolbar, Validators} from 'ngx-editor';
import {Comment} from "../dto/Comment";
import {ConfirmationService, PrimeNGConfig} from "primeng/api";
import {TimelineCommentsComponent} from "../timeline-comments/timeline-comments.component";
import {DatePipe} from "@angular/common";
import {EditorUtils} from "../utils/EditorUtils";
import {MaskUtils} from "../utils/MaskUtils";

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit, OnDestroy {
  editor: Editor;
  form = new FormGroup({
    editorContent: new FormControl('')
  });
  toolbar : Toolbar = EditorUtils.TOOLBAR_ACTIONS;
  comments: Comment[] = [];

  constructor(
    private primengConfig: PrimeNGConfig
  ) {
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.comments = this.getAllComments();
    this.form.get('editorContent')?.setValue(this.getEditorContent())
    //todo here must to register a new plugin, to watch out when text selected
  }

  ngOnDestroy(): void {
    this.editor.destroy;
  }

  onCommentDone(c: Comment) {
    this.addComment(c)
  }

  addComment(comment: Comment) {
    const comments = this.getAllComments();
    if (comments) {
      localStorage.removeItem('comments')
      this.comments = comments;
    }
    this.comments = [... this.comments, comment];
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  getAllComments() : Comment[] {
    const commentsJson = localStorage.getItem('comments');
    if (commentsJson) {
      const comments = JSON.parse(commentsJson) as Comment[];
      comments.map(c => {
        if (c.datetime) {
          c.datetime = Object.assign(new Date(), c.datetime);
          c.datetimeAsString = MaskUtils.dateToHumanString(c.datetime);
        }
      })
      return comments;
    }
    return []
  }

  editorChange(e: string) {
    //todo fix here only when confimation modal button will pressed
    this.saveEditorContent(e)
  }

  getEditorContent() : string {
    const editorContentJson = localStorage.getItem('editorContent');
    if (editorContentJson) {
      return toHTML(JSON.parse(editorContentJson));
    }
    return 'Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Diuretics paradis num copo é motivis de denguis.Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.';
  }

  saveEditorContent(html: string) {
    localStorage.removeItem('editorContent')
    localStorage.setItem('editorContent', JSON.stringify(toDoc(html)))
  }


}
