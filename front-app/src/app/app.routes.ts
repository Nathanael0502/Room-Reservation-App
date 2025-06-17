

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:"chambre",
  loadComponent:()=>import('./component/chambre/chambre.component').then(m=>m.ChambreComponent) 
  },{
    path:"",
    loadComponent:()=>import('./component/login/login.component').then(m=>m.LoginComponent)
  },{
    path:"login",
    loadComponent:()=>import('./component/login/login.component').then(m=>m.LoginComponent)
  },{
    path:"dashboard",
  loadComponent:()=>import('./admin/dashboard/dashboard.component').then(m=>m.DashboardComponent)
  },{
    path:"sign-in",
   loadComponent:()=>import('./component/sign-in/sign-in.component').then(m=>m.SignInComponent)
  },
  {
    path:"reservation",
   loadComponent:()=>import('./component/reservation/reservation.component').then(m=>m.ReservationComponent)
  },
  {
    path:"paiement",
   loadComponent:()=>import('./component/paiements/paiements.component').then(m=>m.PaiementsComponent)
  },
  {
    path:"userClient",
 loadComponent:()=>import('./user-client/user-client.component').then(m=>m.UserClientComponent)
  },{
    path:"client",
    loadComponent:()=> import('./component/client/client.component').then(m=>m.ClientComponent)

  },{
    path:"notifications",
    loadComponent:()=>import('./component/notify/notify.component').then(m=>m.NotifyComponent)
  },{
    path:"history",
    loadComponent:()=>import('./component/history/history.component').then(m=>m.HistoryComponent)
  },{
    path:"facture",
    loadComponent:()=>import('./email-c/email-c.component').then(m=>m.EmailCComponent)
  },{
    path:"chatMess/:id",
    loadComponent:()=>import('./message/chat/chat.component').then(m=>m.ChatComponent)
  },{
    path:"chatMess",
    loadComponent:()=>import('./message/choix-pers/choix-pers.component').then(m=>m.ChoixPersComponent)
  }
];
