import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DateRangePickerModule} from '../lib/daterangepicker.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        DateRangePickerModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
