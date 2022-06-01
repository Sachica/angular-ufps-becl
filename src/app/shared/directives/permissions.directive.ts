import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '@data/models';
import { AuthService } from '@modules/auth/services/auth.service';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective implements OnInit {

  private currentUser: User;
  private permissions: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      this.currentUser = user;
      this.updateView();
    });
  }

  @Input()
  set appPermissions(permissions: string[]) {
    this.permissions = permissions;
    this.updateView();
  }

  private updateView(): void {
    if (this.currentUser && this.hasPermissions()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }


  private hasPermissions(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      return false;
    }
    for (const permission of this.permissions) {
      if (!this.currentUser.user_permissions.some(p => p.codename === permission)) {
        return false;
      }
    }
    return true;
  }

}