import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionService } from './exception.service';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { SharedModule } from '../shared/shared.module';
import { TokenService } from "./token.service";

@NgModule({
  imports:      [ CommonModule, SharedModule ],
  declarations: [ FooterComponent, NavComponent, SpinnerComponent ],
  exports:      [ CommonModule, FooterComponent, NavComponent, SpinnerComponent ],
  providers:    [ ExceptionService, SpinnerService, TokenService ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}