import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-create',
  templateUrl: './visitor-create.page.html',
  styleUrls: ['./visitor-create.page.scss'],
})
export class VisitorCreatePage implements OnInit {
  public createVisitorForm: FormGroup;
  documentTypes = ["Carte d'identité", "Passport"];

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router) {
    
      this.createVisitorForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      comments: new FormControl('')
    });
  }

  async createVisitor() {
    const loading = await this.loadingCtrl.create();
  
    let firstName = this.createVisitorForm.value.firstName;
    let lastName = this.createVisitorForm.value.lastName;
    let comments = this.createVisitorForm.value.comments;
    if (comments == null)
    {
      comments = '';
    }
    let documentNumber = this.createVisitorForm.value.documentNumber;
    let startDate = new Date();

    this.firestoreService
    .createVisitor(firstName, lastName, documentNumber, comments, startDate)
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

  ngOnInit() {
  }

}
