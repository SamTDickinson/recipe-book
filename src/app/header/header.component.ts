import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
