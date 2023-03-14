import {Component, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {Comment} from "../dto/Comment";

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
  constructor() { }

  ngOnInit(): void {
  }

}
