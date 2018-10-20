import { Component, OnInit, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewChecked {

  categories;
  categories$;
  post;
  parentId;
  parentItem;
  constructor(private dataService: DataService, private eleRef: ElementRef, private renderer: Renderer2) { }

  // Retreiving the Categories using data service
  ngOnInit() {
    this.categories$ = this.dataService.getCategories().subscribe(data => {
      console.log(data)
      this.categories = data;
 
    });
  }

  // Updating the view after every add or remove categories.
  ngAfterViewChecked() {
    if(this.categories) {
      for(var i = 0; i < this.categories.length; i++) {
        if(this.categories[i].parent != "none") {
        const id = this.categories[i].id;
        const ul = this.renderer.createElement("ul");
        const li = this.renderer.createElement("li");
        const input = this.renderer.createElement("input");
        this.renderer.setAttribute(input, 'type', 'text');
        this.renderer.setAttribute(input, 'placeholder', 'Type a child category');
        this.renderer.addClass(input, "in" + id);
        const text = this.renderer.createText(this.categories[i].name);
        const addBtn = this.renderer.createElement("button");
        const addText = this.renderer.createText("+");
        const rmvBtn = this.renderer.createElement("button");
        const rmvText = this.renderer.createText("-");


        this.renderer.appendChild(addBtn, addText);
        this.renderer.appendChild(rmvBtn, rmvText);

        this.renderer.appendChild(li, text);
        this.renderer.appendChild(li, input);
        this.renderer.addClass(li, this.categories[i].id);
        this.renderer.addClass(li,  "list-group-item");
        this.renderer.addClass(addBtn, "btn");
        this.renderer.addClass(addBtn, "btn-primary");
        this.renderer.addClass(rmvBtn, "btn");
        this.renderer.addClass(rmvBtn, "btn-danger");
        this.renderer.appendChild(li, addBtn);
        this.renderer.appendChild(li, rmvBtn);
        this.renderer.appendChild(ul, li);   
        this.renderer.listen(addBtn, 'click', (event) => {
          this.addCategory(id);
 
        });
        this.renderer.listen(rmvBtn, 'click', (event) => {
          this.removeCategory(id);
        });
    
        var parent = this.eleRef.nativeElement.querySelector('.' + this.categories[i].parent);
        this.renderer.appendChild(parent, ul);
    
          }
        }
    }



  }


  // method to perform add category functionality
  addCategory(id) {
    let inputTxt = this.eleRef.nativeElement.querySelector('.' + "in" + id).value;
    this.dataService.addCategory(id, inputTxt).subscribe(post => this.post = post);
    location.reload();
  }

  // method to perform remove category functionality
  removeCategory(id) {
    this.dataService.removeCategory(id).subscribe((res: any) => {
      location.reload();
    }, error => console.log(console.log("Category Deleted")));
  }

  generateId() {
   this.parentId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      this.parentId += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return this.parentId;
  }

  addParentCategory() {
    this.generateId();
    location.reload();
    let inputTxt = this.eleRef.nativeElement.querySelector('.' + "in" + this.parentId).value;

    this.dataService.addParentCategory(this.parentId, inputTxt).subscribe(data => this.parentItem = data);
 
  }
} 
