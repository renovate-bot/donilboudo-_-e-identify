import { Component } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitors',
  templateUrl: 'visitors.page.html',
  styleUrls: ['visitors.page.scss']
})
export class VisitorsPage {
  visitors = [];

  constructor(private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.visitors = [];
    this.firestoreService.getVisitors().valueChanges().subscribe(items => {
      items.forEach(item => {
        if (!item.endDate) {
          this.visitors.push(item);
        }
      })
    });
  }
}
