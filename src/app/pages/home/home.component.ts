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
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
    [CommonModule, 
    HeaderComponent, 
    RouterModule, 
    ThingFormComponent, 
    EditComponent, 
    MatIconModule,
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  myThingsService = inject(ItemService);
  authService = inject(AuthService);
  title;
  myThingsList: itemData[] = [];
  formHeadName = 'Add a new thing'; // Define el texto de la cabecera  del form "Add a new thing" 
  buttonName = 'Save';  // Define el texto del botón del form "Add new things"
  auxButton = 'Clear form';  // Define el texto del botón del form "Add new things"
  receivedEmail!: string;
  userEmail: string = 'e-mail';

  constructor(private route: Router,public dialog: MatDialog) {
    this.title = 'Title'; //NO confundir con el literal 'Home' del header
  }
  logout() {
    this.authService.logout().then(() => {
      this.route.navigate(['login']);
    })
  }

  ngOnInit(): void {
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
    const selectedThing = this.myThingsService.thingPicker(index);
    this.route.navigate(['/private/edit', index]);
  }

  removeItem(index: number) {
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      data: {message: 'Are you sure you want to delete this thing for ever?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if(result) {
        this.myThingsService.thingKicker(index);
        this.getThings();
      }
    });
  }

  userWatch(receivedEmail: string){
    console.log('receivedEmail: ', receivedEmail);
    this.userEmail = receivedEmail;
    console.log('userEmail: ', this.userEmail);
  }

/*
*/

}