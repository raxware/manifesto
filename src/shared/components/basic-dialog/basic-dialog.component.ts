import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-basic-dialog',
  standalone: true,
  imports: [ 
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose ],
  templateUrl: './basic-dialog.component.html',
  styleUrl: './basic-dialog.component.scss'
})
export class BasicDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BasicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

}
