import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor(private spinner: SpinnerService) {}
  ngOnInit(): void {}

  showSpinner(): boolean {
    return this.spinner.isLoading();
  }
}
