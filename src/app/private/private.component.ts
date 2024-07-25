import { Component } from '@angular/core';
// import 'primeicons/primeicons.css';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html', // Ensure this path is correct
  styleUrls: ['./private.component.scss'], // Ensure this path is correct
})
export class PrivateComponent {
  items: any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh',
          },
          {
            label: 'Export',
            icon: 'pi pi-upload',
          },
        ],
      },
    ];
  }
}
