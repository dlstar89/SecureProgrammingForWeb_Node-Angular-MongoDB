import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [];

  constructor() { }

  ngOnInit() {
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
    this.posts.push({ title: 'Some Title', author: 'Joker Jo', description: 'Some description on the job' });
  }

}
