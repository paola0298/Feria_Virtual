import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProducerComponent } from './producer/producer.component';
import { CategoryComponent } from './category/category.component';
import { ProducerAffiliationComponent } from './producer-affiliation/producer-affiliation.component';
import { ProductComponent } from './product/product.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProducerComponent,
    CategoryComponent,
    ProducerAffiliationComponent,
    ProductComponent,
    RegisterClientComponent,
    LoginClientComponent,
    ProfileClientComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'producer', component: ProducerComponent },
      { path: 'category', component: CategoryComponent},
      { path: 'producer-affiliation', component: ProducerAffiliationComponent},
      { path: 'product', component: ProductComponent},
      { path: 'register-client', component: RegisterClientComponent},
      { path: 'login-client', component: LoginClientComponent},
      { path: 'profile-client', component: ProfileClientComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
