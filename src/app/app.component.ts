import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { timer, interval, Observable, of } from 'rxjs';
import { map, tap, retryWhen, delayWhen, pairwise, take , endWith } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'rxjs-facades';
    data: any;

    constructor(private apiService: ApiService) {}

    ngOnInit(): any {
    }

    scanOperator(data) {
        data.pipe(pairwise(), take(10)).subscribe(console.log);
    }

    pairwiseOperator() {
        interval(1000)
            .pipe(pairwise(), take(10))
            .subscribe(console.log);
        console.log(this.data);
        const source = of(this.data);
        console.log(source);
        source.pipe(pairwise(), take(10)).subscribe(console.log);
    }

    endWith() {

        const source$ = of('Hello', 'Friend');

        source$
            // emit on completion
            .pipe(endWith('Goodbye', 'Friend'))
            // 'Hello', 'Friend', 'Goodbye', 'Friend'
            .subscribe(console.log);

    }
}
