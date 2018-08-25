import { CommonModule } from '@angular/common'; 
import { NgModule }           from '@angular/core';

import { CallbackComponent }     from './callback.component';
import { CallbackRoutingModule } from './callback-routing.module';
import { TokenService } from '../core/token.service';

@NgModule({
  imports: [
    CommonModule,
    CallbackRoutingModule
  ],
  declarations: [ CallbackComponent ],
  providers:    [TokenService ]
})
export class CallbackModule { }