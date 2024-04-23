import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService{
  constructor(
    private httpClient: HttpClient
  ) {
  }
  
  private async fetch(target, data = null): Promise<any>{
    return this.httpClient.post<any>(environment.api + '/comments', JSON.stringify({
      target: target,
      input: data
    })).toPromise();
  }

  setComment({subject, comment, email}): Promise<any>{
    return this.fetch('set_comment', {
      subject: subject,
      comment: comment,
      email: email
    });
  }

}
