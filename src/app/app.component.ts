import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  notifications = 0;
  title = 'tulayan-app';
  tokenVerified = false;
  userInfo = {first_name: null, last_name: null, email: null, role_id: null};
  
  @ViewChild('tulayanNavbar') navbar : ElementRef | undefined;
  
  constructor(private auth: AuthService, private router: Router, private http : HttpClient){


    router.events.subscribe(val => {
      auth.verifyToken().pipe(map((response: {status: any, body: any}) => {
        if(response.status == 200){
          this.tokenVerified = true;
          const {first_name, last_name, email, role_id} = response.body;
          this.userInfo.first_name = first_name;
          this.userInfo.last_name = last_name;
          this.userInfo.email = email;
          this.userInfo.role_id = role_id;

          return; 
          
        }
        this.tokenVerified = false;
      }), catchError(err => {
        this.tokenVerified = false;
        return of(false);
      })).subscribe();
    });


    this.getNotifications().subscribe((data: any) => {
      let {count} = data;
      this.notifications = count;
    });

    



  }

  ngAfterViewInit(): void {
    
    
    window.addEventListener("scroll", () => {

      

      if(window.scrollY >= 100){

        this.navbar?.nativeElement.classList.add("sticky");


        //this.renderer.addClass(navbar,"sticky");
      }else{

        this.navbar?.nativeElement.classList.remove("sticky");
        //this.renderer.removeClass(navbar,"sticky");
      }

    });
  }


  logoutUser(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getNotifications(){
    return  this.http.get(`${environment.API_HOST}/api/notifications`);
  }



}
