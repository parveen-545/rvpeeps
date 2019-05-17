import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'create-profile', loadChildren: './profile/create-profile/create-profile.module#CreateProfilePageModule' },
  { path: 'profile-list', loadChildren: './profile/profile-list/profile-list.module#ProfileListPageModule' },
  { path: 'profile-view', loadChildren: './profile/profile-view/profile-view.module#ProfileViewPageModule' },
  { path: 'nearby', loadChildren: './nearby/nearby.module#NearbyPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'fav-list', loadChildren: './profile/fav-list/fav-list.module#FavListPageModule' },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
