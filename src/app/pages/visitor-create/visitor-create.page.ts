import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-visitor-create',
  templateUrl: './visitor-create.page.html',
  styleUrls: ['./visitor-create.page.scss'],
})
export class VisitorCreatePage implements OnInit {
  public createVisitorForm: FormGroup;
  photos: any;
  public base64Image : string;
  canTakePicture: boolean = true;

  documentTypes = ["Carte d'identité", "Passport"];

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router,
    private camera : Camera,
    private toastCtrl: ToastController) {
    
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
          this.showToastWithCloseButton("Visite démarée");
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      }
    );
  
    return await loading.present();
  }

  takePhoto () {
    const options : CameraOptions = {
      quality: 100, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      
    }

    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        this.canTakePicture = false;
      }, (err) => {
        this.showToastWithCloseButton(err);
        console.log(err);
      });
  }

  deletePhoto(index){
    this.canTakePicture = true;
    this.photos.splice(index, 1);
 }

 showToastWithCloseButton(message: string) {
  const toast = this.toastCtrl.create({
    message: message,
    showCloseButton: true,
    closeButtonText: 'Ok'
  });
  toast.then(result => {
    result.present();
  });
}

  ngOnInit() {
    this.photos = [];
  }

}
