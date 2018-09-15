import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
// import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ExceptionService } from './exception.service';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { SharedModule } from '../shared/shared.module';
import { TokenInterceptor } from "./token.interceptor";
import { TokenService } from "./token.service";
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SharedModule],
  declarations: [FooterComponent, NavComponent, SpinnerComponent],
  exports: [CommonModule, FooterComponent, NavComponent, SpinnerComponent],
  providers: [
    ExceptionService,
    SpinnerService,
    ToastService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}