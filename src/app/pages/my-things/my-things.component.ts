import { Component, OnInit, inject } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { itemData } from '../../model/interfaces';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-things',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HeaderComponent, RouterModule, MatIconModule],
  templateUrl: './my-things.component.html',
  styleUrl: './my-things.component.scss'
})

export class MyThingsComponent implements OnInit {
  
  myThingsService = inject(ItemService);
  title;
  myThingsList: itemData[] = [];

  constructor(private router: Router) {
    this.title = 'My Things';
  }
  
  ngOnInit(): void {
    this.title;
    this.existingThingsDisplay();
  }
  
  existingThingsDisplay() {
    this.myThingsList = this.myThingsService.getThings();
  }

  thingIndexer(index: number){
    const selectedThing = this.myThingsService.thingPicker(index);
    this.router.navigate(['/edit', index]);  // de uso obligatorio p la tarea?
    //console.log('Se lleva el "index" a edit.component.ts', index);

  //  formFiller(selectedThing);  // Pasar selectedThing a ThingFormComponent?
  } 




}
