import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { itemData } from '../../../app/model/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thing-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './thing-form.component.html',
  styleUrl: './thing-form.component.scss'
})

export class ThingFormComponent {
  @Input () formHeadName!: string; @Input () buttonName!: string; @Input () auxButton!: string; 

  @Input () set thingUnit(thingToEdit: itemData){
    this.unit = thingToEdit;
    this.editFormFiller(thingToEdit);
  };
  get thingUnit (){
    return this.unit;
  }
  @Output() outputtingThing = new EventEmitter<itemData>();
  @Output () outputtingAuxButton = new EventEmitter<string>();
 
  thingPrototype!: FormGroup;
  unit!: itemData;

  constructor(private activatedRoute: ActivatedRoute, private route: Router) {
  this.emptyFormBuilder();
  }

  emptyFormBuilder() {
    this.thingPrototype = new FormGroup({
      thingType: new FormControl(''),
      quantity: new FormControl(''),
      thingDescription: new FormControl('', [Validators.required]),
      thingStatus: new FormControl(''),
      onLoan: new FormControl(''),
      borrowerName: new FormControl(''),
      loanDate: new FormControl(''),
      defaulter: new FormControl(''),
    });
  }
  thingTagger() {
    if (this.thingPrototype.valid){
      const yetTaggedThing: itemData = {
        thingType: this.thingPrototype.get('thingType')?.value,
        quantity: this.thingPrototype.get('quantity')?.value,
        thingDescription: this.thingPrototype.get('thingDescription')?.value,
        thingStatus: this.thingPrototype.get('thingStatus')?.value,
        onLoan: true,
        borrowerName: this.thingPrototype.get('borrowerName')?.value,
        loanDate: this.thingPrototype.get('loanDate')?.value,
        defaulter: true,
      }
      this.outputtingThing.emit(yetTaggedThing);
      this.auxButtonSelector(this.auxButton);
    }
    else {
        console.log('thingPrototype is INVALID!!!');
    }
  }
  editFormFiller(thingToEdit: itemData){
    this.thingPrototype.patchValue({
      thingType: thingToEdit.thingType,
      quantity: thingToEdit.quantity,
      thingDescription: thingToEdit.thingDescription,
      thingStatus: thingToEdit.thingStatus,
      onLoan: thingToEdit.onLoan,
      borrowerName: thingToEdit.borrowerName,
      loanDate: thingToEdit.loanDate,
      defaulter: thingToEdit.defaulter
    })
  }

  auxButtonSelector(auxButtonName: string){
    switch (auxButtonName){
      case "Clear form": this.thingPrototype.reset(); console.log('auxButtonSelector: CLEAR FUNCIONA!!!'); break;
      case  'Cancel':    this.route.navigate(['/private/home']); console.log('auxButtonSelector: CANCEL FUNCIONA!!!'); break;
    }
  }
}