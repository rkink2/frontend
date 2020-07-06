import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/admin/maps/maps.component';
import { UserProfileComponent } from '../../pages/admin/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'maps', component: MapsComponent },
    {
        path: 'users',
        loadChildren: () => import('../../pages/admin/users/users.module').then(m => m.UsersModule)
        // loadChildren: '../../pages/admin/users/users.module#UsersModule'
    }
];
