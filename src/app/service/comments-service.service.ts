import {Injectable} from '@angular/core';
import {Comment} from "../dto/Comment";
import {MaskUtils} from "../utils/MaskUtils";

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {

  constructor() { }

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

  //get comments by index from editor content
  findCommentByIndex(index: number) : Comment[] {
    const allComments = this.getAllComments();
    if (allComments) {
      return allComments
        .filter(c => (c.from && c.to) && (index >= c.from && index <= c.to))
    }
    return [];
  }

  addComment(comment: Comment){
    const comments = this.getAllComments();
    if (comments) {
      localStorage.removeItem('comments')
    }
    localStorage.setItem('comments', JSON.stringify([... comments, comment]));
  }


}
