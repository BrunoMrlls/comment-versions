import {Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditorView} from "prosemirror-view";
import {Subscription} from "rxjs";
import {Editor} from "ngx-editor";
import {Comment} from "../dto/Comment";
import {NamesUtils} from "../utils/NamesUtils";
import {MaskUtils} from "../utils/MaskUtils";
import {EditorUtils} from "../utils/EditorUtils";


@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.component.html',
  styleUrls: ['./comment-popup.component.css']
})
export class CommentPopupComponent implements OnInit, OnDestroy {
  showPopup = false;
  isActive = false;
  canExecute = true;
  form: FormGroup;
  comment: Comment;

  @Input() editor : Editor
  @Output() onCommentClick : EventEmitter<Comment> = new EventEmitter();

  private editorView: EditorView;
  private updateSubscription: Subscription;

  constructor(
    private el: ElementRef,
  ) { }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hideForm();
    }
  }

  getLabel(): string {
    return `Comment`;
  }

  private hideForm(): void {
    this.showPopup = false;
    this.form.reset({
      text: '',
      content: ''
    });
    this.text.enable();
  }

  onMouseDown(e: MouseEvent): void {
    if (e.button !== 0) {
      return;
    }
    this.showPopup = !this.showPopup;
    if (this.showPopup) {
      this.setText();
    }
  }

  private setText = () => {
    const { state: { selection, doc } } = this.editorView;
    const { empty, from, to } = selection;
    const selectedText = !empty ? doc.textBetween(from, to) : '';
    if (selectedText) {
      this.text.patchValue(selectedText);
      this.text.disable();
    }
  };

  private update = (view: EditorView) => {
    this.isActive = this.showPopup;
    const { state: { selection } } = view;
    const { empty } = selection;
    this.canExecute = !empty;
  };

  insertComment(e: MouseEvent): void {
    e.preventDefault();
    const { text } = this.form.getRawValue();
    const { dispatch, state } = this.editorView;
    const { selection } = state;

    const from = selection.from;
    const to = selection.to;
    const contentSelected : string = this.form.get('text')?.value;
    const inputText = this.content.value;
      // console.log('Is empty: ', state.selection.empty)
      // console.log('From : ', from, 'Until : ', to)
      // console.log('Content: ', state.doc.textContent)
      // console.log('Selected: ', text)

    const names = NamesUtils.NAMES;
    const user = names[Math.floor(Math.random()*names.length)];

    const datetime = new Date();
    const datetimeAsString = MaskUtils.dateToHumanString(datetime);

    this.comment = new Comment(user, contentSelected, from, to, datetime, datetimeAsString, inputText);

    this.editor
      .commands
      .textColor(EditorUtils.SELECTED_COLOR_TEXT)
      .backgroundColor(EditorUtils.SELECTED_BACKGROUND_COLOR)
      .applyMark('textCommented')
    .exec();

    this.editorView.focus();

    this.hideForm();

    this.onCommentClick.emit(this.comment)
  }

  ngOnInit(): void {
    this.editorView = this.editor.view;

    this.form = new FormGroup({
      text: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this.updateSubscription = this.editor.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  get title(): string {
    return `Insert comment`;
  }

  get text(): AbstractControl {
    // @ts-ignore
    return this.form.get('text');
  }
  get content(): AbstractControl {
    // @ts-ignore
    return this.form.get('content');
  }


}
