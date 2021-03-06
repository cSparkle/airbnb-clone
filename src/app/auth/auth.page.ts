import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in..." })
      .then((loadingSpinner) => {
        loadingSpinner.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingSpinner.dismiss();
          this.router.navigateByUrl("/places/tabs/discover");
        }, 1500);
      });
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    if (this.isLogin) {
      // send login request
    } else {
      // send signup request
    }
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
}
