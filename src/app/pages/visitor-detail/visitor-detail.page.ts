import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Visitor } from '../../models/visitor.interface';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-visitor-detail',
  templateUrl: './visitor-detail.page.html',
  styleUrls: ['./visitor-detail.page.scss'],
})
export class VisitorDetailPage implements OnInit {
  visitorId: string;
  visitor: Visitor;
  pipe = new DatePipe('en-US');
  isVisitEnd: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public loadingCtrl: LoadingController,
    private location: Location
  ) {}

  ngOnInit() {
    this.visitorId = this.route.snapshot.paramMap.get('id');

    this.firestoreService.getVisitorDetail(this.visitorId).valueChanges().subscribe(val => {
      let id = val.id;
      let firstName = val.firstName;
      let lastName = val.lastName;
      let documentNumber = val.documentNumber;
      let comment = val.comments;
      let startDate = val.startDate;
      let endDate = val.endDate;

      this.visitor = new Visitor(id, firstName, lastName, documentNumber, comment, startDate, endDate);

      if (endDate)
      {
        this.isVisitEnd = true;
      }
    });
  }

  async endVisite() {
    const loading = await this.loadingCtrl.create();

    let endDate = new Date();
    this.visitor.endDate = endDate;
    this.firestoreService.updateVisitor(this.visitorId, this.visitor)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      }
    );

    return await loading.present();
  }

  goBack() {
    this.location.back();
  }
}
