import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  posts = [
    {title: 'First Post', content: " This is the first post content"},
    {title: 'Second Post', content: " This is the Second post content"},
    {title: 'Third Post', content: " This is the Third post content"}
  ];

  enteredValue = '';
  newPost = '';
  onAddPost(){
    //console.dir(postInput);
    this.newPost = this.enteredValue;
  }

}
