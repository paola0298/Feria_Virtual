import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ProducerComponent } from './producer/producer.component';
import { CategoryComponent } from './category/category.component';
import { ProducerAffiliationComponent } from './producer-affiliation/producer-affiliation.component';
import { ProductComponent } from './product/product.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RestclientService } from './services/restclient.service';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuProducerComponent } from './menu-producer/menu-producer.component';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { ManageAffiliationsComponent } from './manage-affiliations/manage-affiliations.component';
import { AvailableProducersComponent } from './available-producers/available-producers.component';
import { ProducerStoreComponent } from './producer-store/producer-store.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    ProducerComponent,
    CategoryComponent,
    ProducerAffiliationComponent,
    ProductComponent,
    RegisterClientComponent,
    LoginClientComponent,
    ProfileClientComponent,
    ShoppingCartComponent,
    LoginAdminComponent,
    MenuAdminComponent,
    MenuProducerComponent,
    MenuClientComponent,
    ManageAffiliationsComponent,
    AvailableProducersComponent,
    ProducerStoreComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'producer', component: ProducerComponent },
      { path: 'category', component: CategoryComponent},
      { path: 'producer-affiliation', component: ProducerAffiliationComponent},
      { path: 'product', component: ProductComponent},
      { path: 'register-client', component: RegisterClientComponent},
      { path: 'login-client', component: LoginClientComponent},
      { path: 'profile-client', component: ProfileClientComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      { path: 'login-admin', component: LoginAdminComponent},
      { path: 'menu-admin', component: MenuAdminComponent},
      { path: 'menu-producer', component: MenuProducerComponent},
      { path: 'menu-client', component: MenuClientComponent},
      { path: 'manage-affiliations', component: ManageAffiliationsComponent},
      { path: 'available-producers', component: AvailableProducersComponent},
      { path: 'producer-store', component: ProducerStoreComponent},
    ])
  ],
  providers: [RestclientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
