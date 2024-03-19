import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class MaterialModule { }