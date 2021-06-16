import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    Camera
  ]
})
export class ProfilePageRoutingModule {}
