import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorHandlerService } from '../Services/error-handler.service';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  showDialog = false;
  rrorMessage = "";
    constructor(private errorHandler: ErrorHandlerService) {
        this.errorHandler.dialogSatte.subscribe((data: any) => {
          this.showDialog = data.show;
          this.rrorMessage = data.message;
          document.body.style.overflow = "hidden"
    });

    } 



  closeDialog() {
  
    this.errorHandler.hideDialog();
       document.body.style.overflow = "scroll"
  }
}