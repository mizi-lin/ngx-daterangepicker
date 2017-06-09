import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {daterangepickerModule} from '../lib/daterangepicker.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        daterangepickerModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
