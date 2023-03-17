import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DocumentEditorComponent} from './document-editor/document-editor.component';

import {PanelModule} from 'primeng/panel';
import {NgxEditorModule} from 'ngx-editor';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InplaceModule} from "primeng/inplace";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TimelineCommentsComponent} from './timeline-comments/timeline-comments.component';
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import localept from '@angular/common/locales/pt';
import {CommentPopupComponent} from './comment-popup/comment-popup.component';
import {SanitizeHtmlPipe} from './pipes/sanitize/sanitize-html.pipe';
import {RippleModule} from "primeng/ripple";

registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    DocumentEditorComponent,
    TimelineCommentsComponent,
    CommentPopupComponent,
    SanitizeHtmlPipe,
  ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        PanelModule,
        BrowserAnimationsModule,
        NgxEditorModule,
        DialogModule,
        ButtonModule,
        InplaceModule,
        InputTextareaModule,
        InputTextModule,
        ScrollPanelModule,
        TimelineModule,
        CardModule,
        RippleModule,
    ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
