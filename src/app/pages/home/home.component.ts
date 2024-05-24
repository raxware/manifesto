import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { itemData } from '../../model/interfaces';
import { ThingFormComponent } from '../../../shared/components/thing-form/thing-form.component';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { BasicDialogComponent } from '../../../shared/components/basic-dialog/basic-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
    [CommonModule, 
    HeaderComponent, 
    RouterModule, 
    ThingFormComponent, 
    EditComponent, 
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  myThingsService = inject(ItemService);
  title;
  myThingsList: itemData[] = [];
  formHeadName = 'Add a new thing'; // Define el texto de la cabecera  del form "Add a new thing" 
  buttonName = 'Save';  // Define el texto del botón del form "Add new things"
  auxButton = 'Clear form';  // Define el texto del botón del form "Add new things"

  constructor(private router: Router,
    public dialog: MatDialog
  ) {
    console.log('constructor');
    this.title = 'Title'; //NO confundir con el valor 'Home' del header
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.title);
    this.getThings();
  }
  getThings() {
    this.myThingsList = this.myThingsService.getThings();
  }
  saveThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
    this.getThings();
  }
  thingIndexer(index: number) {
    console.log('El item elegido tiene posición:', index);
    const selectedThing = this.myThingsService.thingPicker(index);
    console.log('El item elegido fue:', selectedThing);
    this.router.navigate(['/edit', index]);
  }

  removeItem(index: number) {
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      data: {message: 'Are you sure you want to delete this thing for ever?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result) {
        this.myThingsService.thingKicker(index);
        this.getThings();
      }
    });
  }

/*
*/

}