import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamGuard implements CanActivate {

  constructor( private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const teamId: string = route.paramMap.get('teamCode') || "";

    if ((teamId == "") || (teamId != "" && Number.isNaN(parseInt(teamId))) || (parseInt(teamId) < 0)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
  
}
