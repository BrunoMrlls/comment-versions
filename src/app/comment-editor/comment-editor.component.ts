import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {setBlockType} from 'prosemirror-commands';
import {EditorState, Plugin, PluginKey, Transaction} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';

import {Editor} from 'ngx-editor';
import {Comment} from "../dto/Comment";
import {NamesUtils} from "../utils/NamesUtils";
import {EditorUtils} from "../utils/EditorUtils";
import {MaskUtils} from "../utils/MaskUtils";

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit {

  @Input() editor: Editor;

  @Output() onCommentClick : EventEmitter<Comment> = new EventEmitter();
  isActive = false;
  isDisabled = false;

  isThereCommentToConfirm = false;
  comment: Comment;
  message: string = '';

  constructor() { }

  ngOnInit(): void {
    const plugin = new Plugin({
      key: new PluginKey(`custom-menu-comment`),
      view: () => {
        return {
          update: this.update,
        };
      },
    });
    this.editor.registerPlugin(plugin);
  }

  onClick(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.execute(state, dispatch);

    const from = state.selection.from;
    const to = state.selection.to;
    const text = state.doc.textBetween(from, to);
    // console.log('Is empty: ', state.selection.empty)
    // console.log('From : ', from, 'Until : ', to)
    // console.log('Content: ', state.doc.textContent)
    // console.log('Selected: ', text)

    const names = NamesUtils.NAMES;
    const user = names[Math.floor(Math.random()*names.length)];

    const datetime = new Date();
    const datetimeAsString = MaskUtils.dateToHumanString(datetime);

    this.comment = new Comment(user, text, from, to, datetime, datetimeAsString);

    this.isThereCommentToConfirm = true;
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;
    if (this.isActive) {
      return setBlockType(schema.nodes['paragraph'])(state, dispatch);
    }
    return setBlockType(schema.nodes['code_mirror'])(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    this.isDisabled = state.selection.empty;
  };

  sendComment() {

    this.editor
      .commands
      .textColor(EditorUtils.SELECTED_COLOR_TEXT)
      .backgroundColor(EditorUtils.SELECTED_BACKGROUND_COLOR)
      .applyMark('textCommented')
      .exec();

    this.comment.message = this.message;
    this.onCommentClick.emit(this.comment)
    this.isThereCommentToConfirm = false;
    this.message = ''
  }

  cancelModal() {
    this.isThereCommentToConfirm = false;
    this.message = ''
  }

}
