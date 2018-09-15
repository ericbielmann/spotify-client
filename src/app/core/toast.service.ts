import { Injectable, Optional, SkipSelf } from '@angular/core';
// declare var toastr: any;
import * as toastr from 'toastr';

@Injectable()
export class ToastService {

  constructor(@Optional() @SkipSelf() prior: ToastService) {
    if (prior) {
      console.log('toast service already exists');
      return prior;
    }

    this.init();
  }

  success(title: string, message?: string) {
    toastr.success(title, message);
  }

  warning(title: string, message?: string) {
    toastr.warning(title, message);
  }

  info(title: string, message?: string) {
    toastr.info(title, message);
  }

  error(title: string, message?: string) {
    toastr.error(title, message);
  }

  init() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
}