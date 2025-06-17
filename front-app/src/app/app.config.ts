import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient } from '@angular/common/http';
import { Home,Clock,Bed,
   LucideAngularModule,User,Hotel,Calendar, House, Bell, CreditCard, MessageCircle, Cpu, 
   Star,
   StarOff,
   Search,Menu,ChartLine,Plus,Trash,Edit,Receipt,Image,Book,Text,
   Eye} from 'lucide-angular';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideCharts(withDefaultRegisterables()),
provideHttpClient(),importProvidersFrom(LucideAngularModule.pick({Home,User,Hotel,Calendar,House,Bell,Text,
  CreditCard,MessageCircle,Cpu,Clock,Bed,Star,StarOff,Search,Menu,ChartLine,Plus,Trash,Edit,Eye,Receipt,Image,Book}))
  
  ]
};
