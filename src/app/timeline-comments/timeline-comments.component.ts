import {Component, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {Comment} from "../dto/Comment";
import {NamesUtils} from "../utils/NamesUtils";
import {MaskUtils} from "../utils/MaskUtils";
import {CommentsService} from "../service/comments.service";

@Component({
  selector: 'app-timeline-comments',
  templateUrl: './timeline-comments.component.html',
  styleUrls: ['./timeline-comments.component.scss']
})
export class TimelineCommentsComponent implements OnInit {
  events1: any;
  icon = PrimeIcons.SEND;
  colorIcon = '#6c757d'
  BackgroudColorIcon = '#efefef'

  @Input()
  comments: Comment[] = [];
  showReplyButton = false;
  newCommentTextContent = '';
  constructor(
    private commentService: CommentsService
  ) { }

  ngOnInit(): void {
  }

  cancelNewComment() {
    this.showReplyButton = !this.showReplyButton;
    this.newCommentTextContent = '';
  }

  newComment() {
    const comment = { ... this.comments[0]};
    console.log(comment)
    const names = NamesUtils.NAMES;
    comment.user = names[Math.floor(Math.random() * names.length)];
    comment.message = this.newCommentTextContent;
    comment.datetime = new Date();
    comment.datetimeAsString = MaskUtils.dateToHumanString(comment.datetime);

    this.commentService.addComment(comment);

    this.comments = this.commentService.findCommentByIndex(comment.from ? comment.from : 0);

    this.cancelNewComment();
  }

}
