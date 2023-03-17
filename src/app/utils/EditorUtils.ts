import {Toolbar} from "ngx-editor";

export class EditorUtils {
  static SELECTED_COLOR_TEXT = '#b60205';
  static SELECTED_BACKGROUND_COLOR = '#fef2c0';

  static TOOLBAR_ACTIONS : Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  static CONTEXT_TOOLBAR_ACTIONS : Toolbar = [
    ['bold', 'italic'],
    ['underline'],
  ];
  static ICON_COMMENT_CLASS = [
    'NgxEditor__MenuItem'
    , 'NgxEditor__MenuItem--Icon'
    , 'NgxEditor__Seperator'
  ];
}
