import { Component, OnInit, inject } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;
  hobbyForm!: FormGroup;
  frameworks: string[] = ['angular', 'react', 'vue'];
  frameworkVersions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };
  selectedFrameworkVersions: string[] = [];
  constructor(
    private spinner: SpinnerService,
    private fb: FormBuilder,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      framework: new FormControl('', Validators.required),
      frameworkVersion: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      hobby: this.fb.array([], [this.minHobbies(1)]),
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get dateOfBirth() {
    return this.userForm.get('dateOfBirth');
  }
  get framework() {
    return this.userForm.get('framework');
  }
  get frameworkVersion() {
    return this.userForm.get('frameworkVersion');
  }
  get email() {
    return this.userForm.get('email');
  }
  get hobby() {
    return this.userForm.get('hobby') as FormArray;
  }
  addHobby() {
    (<FormArray>this.userForm.get('hobby')).push(
      this.fb.group({
        name: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required),
      })
    );
    console.log(this.userForm);
  }
  removeHobby(index: any) {
    (<FormArray>this.userForm.get('hobby')).removeAt(index);
  }
  selectFramework(framework: string) {
    this.selectedFrameworkVersions =
      this.frameworkVersions[framework as keyof typeof this.frameworkVersions];
    console.log(this.selectedFrameworkVersions);
  }
  checkEmail() {
    this.spinner.show();
    this.userService
      .checkEmail(this.email?.value)
      .subscribe((response: string) => {
        if (response.length) {
          alert(response);
        }
        this.spinner.hide();
      });
  }
  submit() {
    this.dateOfBirth?.setValue(
      this.convertDate(this.dateOfBirth.value.toString())
    );
    console.log(this.userForm.value);
    this.reset();
  }
  reset() {
    this.userForm.reset();
    this.selectedFrameworkVersions = [];
  }
  minHobbies(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hobbies = control.value as any[];

      if (!hobbies || hobbies.length < minLength) {
        return {
          minHobbies: {
            requiredLength: minLength,
            actualLength: hobbies ? hobbies.length : 0,
          },
        };
      }

      return null;
    };
  }
  convertDate(dateValue: string) {
    console.log(dateValue);
    const date = new Date(dateValue);
    console.log(date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
