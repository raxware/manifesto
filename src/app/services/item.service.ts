import { Injectable } from '@angular/core';
import { itemData } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor() { }

  getThings(): itemData[] {
    if (window.localStorage.getItem('myThings') !== null) {
      return JSON.parse(window.localStorage.getItem('myThings')!);
    } else {
      return [];
    }
  }
  setThing(thingUnit: itemData) { // recibe parámetros de "thing-form.c.ts"  -->  thingTagger() { ... setThing(yetTaggedThing);}
    const myThings = this.getThings(); 
    myThings.push(thingUnit);
    this.saveThings(myThings);
  }
  editThing(index: number, reDefinedThing: itemData){  // recibe parámetros de "edit.c.ts"  -->  editThing(this.index, thingUnit);{ ... setThing(thingUnit);}
    const myThings = this.getThings();
    myThings[index] = reDefinedThing;
    this.saveThings(myThings);
  }
  thingPicker(index: number){     // recibe parámetros de "my-things.c.ts"  -->  thingIndexer(index: number){ ... thingPicker(index);}
    const pickedThing = this.getThings();
    return pickedThing[index];
  }
  thingKicker(index: number) {    // recibe parámetros de ... aún no definido, pero probablemente desde "my-things.c.ts"
    const myThings = this.getThings();
    myThings.splice(index, 1);
    this.saveThings(myThings);
  }
  private saveThings(editedThings: itemData[]){
    window.localStorage.setItem('myThings', JSON.stringify(editedThings));
  }
}