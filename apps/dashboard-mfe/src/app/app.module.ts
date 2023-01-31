/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from '../../../../libs/shared/src/lib/footer/footer.component';
import { HeaderComponent } from '../../../../libs/shared/src/lib/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SphericalGeometryComponent } from './components/art/spherical-geometry/spherical-geometry.component';
import { ArtPageComponent } from './pages/art-page/art-page.component';
import { CodingPageComponent } from './pages/coding-page/coding-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PagenotfoundComponent,
    MusicPageComponent,
    ArtPageComponent,
    CodingPageComponent,
    ContactPageComponent,
    SphericalGeometryComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
