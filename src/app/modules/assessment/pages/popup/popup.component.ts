import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialog) {
    this.message = data
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.closeAll()
  }
}
