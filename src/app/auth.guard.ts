import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { catchError, map, of } from "rxjs";

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.verifyToken().pipe(map((response : {status: number, body: any}) => {
        if(response.status == 200){
            const {role_id} = response.body;
            if(role_id == 1){
                return true;
            }
            
        }
        router.navigate(['login']);
        return false;
        
    }), catchError((error) => {
        router.navigate(['login']);
        return of(false);
    }));

    

};


export const authGuardTenants = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.verifyToken().pipe(map((response : {status: number, body: any}) => {
        if(response.status == 200){
            const {role_id} = response.body;
            if(role_id == 1 || role_id == 2){
                return true;
            }
            
        }
        router.navigate(['login']);
        return false;
        
    }), catchError((error) => {
        router.navigate(['login']);
        return of(false);
    }));

    

};





export const authGuardGeneral = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.verifyToken().pipe(map((response : {status: number, body: any}) => {
        if(response.status == 200){
            const {role_id} = response.body;
            if(role_id == 1){
                router.navigate(['tenants']);
                return false;
            }

            if(role_id == 2){
                router.navigate(['units-available']);
                return false;
            }
            
        }
        
        return true;
        
    }), catchError((error) => {
        return of(true);
    }));

    

};

