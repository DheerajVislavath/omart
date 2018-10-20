import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  catUrl = "http://localhost:3000/categories";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getCategories() {
    return this.http.get(this.catUrl);
  }

  addCategory(id, txt) {
    return this.http.post(this.catUrl, {
      "name": txt,
      "parent": id,
      "child": []
    })
  }

  addParentCategory(id, txt) {
    return this.http.post(this.catUrl, {
      "name": txt,
      "parent": "none",
      "child": []
    })
  }
  removeCategory(id) {
    return this.http.delete(this.catUrl + "/" + id);
  }
}
