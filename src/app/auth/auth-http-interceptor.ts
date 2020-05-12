import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// An interceptor is useful for modifying every request at once
// This one is mainly used to add withCredentials, which can easily be added
// on the request itself from the service, but with many requests, better to do
// it and other tasks here.
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Modify or log the outgoing request
        const modifiedReq = req.clone({ // req is readonly, but we can clone and modify it, and pass the clone along
            withCredentials: true
        })
        return next.handle(modifiedReq) // passes the (modified) req along to the next intercepor or the function making the req
            .pipe(
                tap(val => {
                    if (val.type === HttpEventType.Sent) {
                        console.log('Request was sent to the server')
                    }
                    if (val.type === HttpEventType.Response) {
                        console.log('Got a response from the server', val)
                    }
                })
            )
    }

}
