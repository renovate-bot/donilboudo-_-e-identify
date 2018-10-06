import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Visitor } from '../../models/visitor.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(private firestore: AngularFirestore) { }

  createVisitor(firstName: string, 
                lastName: string, 
                documentNumber: string, 
                comments: string, 
                startDate: Date): Promise<void> {
    
      const id = this.firestore.createId();

      return this.firestore.doc(`visitors/${id}`).set({
        id,
        firstName,
        lastName,
        documentNumber,
        comments,
        startDate
      });
  }

  getVisitors(): AngularFirestoreCollection<Visitor> {
    return this.firestore.collection(`visitors`);
  }

  getVisitorDetail(visitorId: string): AngularFirestoreDocument<Visitor> {
    return this.firestore.collection('visitors').doc(visitorId);
  }

  updateVisitor(visitorId, visitor: Visitor): Promise<void> {
    return this.firestore.doc(`visitors/${visitorId}`).set(Object.assign({}, visitor));
  }
}
