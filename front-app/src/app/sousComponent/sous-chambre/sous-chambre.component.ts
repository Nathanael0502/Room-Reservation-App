import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-sous-chambre',
  imports: [],
  templateUrl: './sous-chambre.component.html',
  styleUrl: './sous-chambre.component.css'
})
export class SousChambreComponent {
@Input() chambre:any;
@Output() monEvenement=new EventEmitter<boolean>();

sendClose(){
  this.monEvenement.emit(false)
}
}
