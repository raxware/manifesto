import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ItemService } from '../../services/item.service';
import { itemData } from '../../model/interfaces';
import { ThingFormComponent } from '../../../shared/components/thing-form/thing-form.component';
import { Router} from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ThingFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit{
  myThingsService = inject(ItemService);
  thingUnit!: itemData;
  buttonName = 'Save changes'; // Define el texto del botón del form "Edit things" 
  formHeadName = 'Edit thing'; // Define el texto de la cabecera del form "Edit thing"
  auxButton = 'Cancel'; // Define el texto del botón auxiliar del form "Edit things"
  index!: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.index = params['id'];
      console.log('Al navegar al edit el index sigue siendo: ', this.index)
      this.thingUnit = this.myThingsService.thingPicker(this.index); // recupera el "index" pasado por "this.router.navigate(['/edit', index]);" desde "my-Things.c.ts"
      console.log('Y del servicio "thingPicker" obtiene: ', this.thingUnit)
      console.log('PUNTO DE SALTO');
    })
  }

  editorTriggerButton(thingUnit: itemData){
    this.myThingsService.editThing(this.index, thingUnit);
    console.log('"editorTriggerButton", pasa "thingUnit" a "myThingsService.editThing" como parámetro: ', this.thingUnit)
    this.router.navigate(['/home']);
  }

  abortEdition(_value?: any){
    this.router.navigate(['/home']);
  }
}

