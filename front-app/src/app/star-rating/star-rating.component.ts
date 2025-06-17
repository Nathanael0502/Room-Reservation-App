import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-star-rating',
  imports: [FormsModule,CommonModule,LucideAngularModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
@Input() rating:number=0;
@Output() ratingChange=new EventEmitter<number>();

rate(starIndex:number){
  this.rating=starIndex+1;
  this.ratingChange.emit(this.rating);
}
}
