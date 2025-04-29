import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CostumerService } from '../../services/costumer.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// NG-ZORRO form-related modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent implements OnInit {
  listOfBrand = ["BMW", "AUDI", "FERRARI", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
  listOfTyepe = ["Petrol", "Diesel", "Electric", "Hybrid"];
  listOfColor = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Purple", "Pink", "Orange", "Gray"];
  listOfTranssmission = ["Automatic", "Manual"];
  postCarForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private service: CostumerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.postCarForm = this.fb.group({
      brand: [null, Validators.required],
      type: [null, Validators.required],
      name: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      year: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  postCar(): void {
    console.log(this.postCarForm.value);
  }
}
