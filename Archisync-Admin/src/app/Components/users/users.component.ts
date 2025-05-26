import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/UserService/users.service';
import { User ,UserServer} from '../../Models/User';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {


  users: User[] = [];
  userForm: FormGroup;
  isEditMode = false;
  selectedUserId: number | null = null;
  isFormVisible = false;

  constructor(private userService: UsersService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const user: UserServer = {
      UserName: this.userForm.value.userName,
      Email: this.userForm.value.email,
      RoleName: this.userForm.value.role,
      Password: this.userForm.value.password
    };
    if (this.isEditMode && this.selectedUserId) {

      this.userService.updateUser(user, this.selectedUserId).subscribe(() => {
        this.fetchUsers();
        this.resetForm();
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.fetchUsers();
        this.resetForm();
      });
    }
  }

  editUser(user: User): void {
    this.isEditMode = true;
    this.selectedUserId = user.userId;
    this.userForm.patchValue(user);
    this.isFormVisible = true;
  }
  openAddUser(): void {
    this.isFormVisible = true;
    this.isEditMode = false;
    this.selectedUserId = null;
  }
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
    }
  }
  resetForm(): void {
    this.userForm.reset({ role: 'user' });
    this.isEditMode = false;
    this.selectedUserId = null;
  }
  closeForm(): void {
    this.isFormVisible = false;
    this.resetForm();
  }
}