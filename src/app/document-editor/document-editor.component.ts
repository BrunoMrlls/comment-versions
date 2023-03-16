import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Editor, Toolbar} from 'ngx-editor';
import {Comment} from "../dto/Comment";
import {PrimeNGConfig} from "primeng/api";
import {EditorUtils} from "../utils/EditorUtils";
import {Plugin, PluginKey, TextSelection} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {CommentsServiceService} from "../service/comments-service.service";
import {EditorServiceService} from "../service/editor-service.service";

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
  contextCustomToolbar : Toolbar = EditorUtils.CONTEXT_TOOLBAR_ACTIONS;

  iconCommentMenuClass = EditorUtils.ICON_COMMENT_CLASS;
  comments: Comment[] = [];
  selectedComment: Comment = {from: 0, message: ''}

  constructor(
    private primengConfig: PrimeNGConfig
    , private commentService: CommentsServiceService
    , private editorService: EditorServiceService

  ) {
    this.editor = new Editor();
    const plugin = new Plugin({
      key: new PluginKey(`custom-menu-comment`),
      view: () => {
        return {
          update: this.editorTextStateUpdated,
        };
      },
    });
    this.editor.registerPlugin(plugin);
  }

  editorTextStateUpdated = (view: EditorView) => {
    const { state, dispatch } = view;
    const from = state.selection.from;
    this.comments = this.commentService.findCommentByIndex(from);
    const comment = this.comments[0];
    if (comment) {
      this.selectedComment = comment;
      if (comment.from && comment.to) {
        // if (dispatch) {
          // const tr = state.tr.setSelection(TextSelection.create(state.doc, comment.from, comment.to)).scrollIntoView();
          // dispatch(tr);
        // }
        // todo find something to mark thats text, to show thats was commented, beyond selection ?
        //disable comment button, user can comment using right panel.
      }
    }
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form.get('editorContent')?.setValue(this.editorService.getEditorContent())
  }

  ngOnDestroy(): void {
    this.editor.destroy;
  }

  onCommentDone(c: Comment) {
    //todo before save, verify if is there something already indexed ?
    //because can there be comments above or below of each other.
    this.commentService.addComment(c)
    const index = this.selectedComment.from ? this.selectedComment.from : 0;
    // this.comments = this.commentService.findCommentByIndex(index);
    this.comments = [... this.comments, c];
  }

  editorChange(e: string) {
    this.editorService.saveEditorContent(e);
  }

}
