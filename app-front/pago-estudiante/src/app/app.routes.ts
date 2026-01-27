import { Routes } from "@angular/router";
import { AdminTemplate } from "./admin-template/admin-template";
import { Estudiantes } from "./estudiantes/estudiantes";
import { authGuard } from "./guards/auth-guard";
import { authorizationGuard } from "./guards/authorization-guard";
import { Home } from "./home/home";
import { LoadEstudiantes } from "./load-estudiantes/load-estudiantes";
import { LoadPagos } from "./load-pagos/load-pagos";
import { Login } from "./login/login";
import { NewEstudiante } from "./new-estudiante/new-estudiante";
import { NewPago } from "./new-pago/new-pago";
import { PagoEstudiante } from "./pago-estudiante/pago-estudiante";
import { Pagos } from "./pagos/pagos";
import { Docentes } from "./docentes/docentes";
import { Materias } from "./materias/materias";
import { NewDocente } from "./new-docente/new-docente";
import { LoadDocentes } from "./load-docentes/load-docentes";
import { MateriaDocente } from "./materia-docente/materia-docente";
import { LoadMaterias } from "./load-materias/load-materias";
import { NewMateria } from "./new-materia/new-materia";

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminTemplate,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { 
        path: 'loadEstudiantes', 
        component: LoadEstudiantes, 
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'loadPagos', 
        component: LoadPagos, 
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'loadDocentes', 
        component: LoadDocentes, 
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'loadMaterias', 
        component: LoadMaterias, 
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { path: 'estudiantes', component: Estudiantes },
      { path: 'pagos', component: Pagos },
      { path: 'docentes', component: Docentes },
      { path: 'materias', component: Materias },
      { path: 'new-estudiante', component: NewEstudiante,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      }, 
      { path: 'new-docente', component: NewDocente,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { path: 'new-materia', component: NewMateria,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { path: 'new-estudiante/:idEstudiante', component: NewEstudiante,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
       }, 
       { path: 'new-docente/:idDocente', component: NewDocente,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
       }, 
       { path: 'new-materia/:idMateria', component: NewMateria,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
       }, 
      { path: 'pago-estudiante', component: PagoEstudiante ,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
      { path: 'materia-docente', component: MateriaDocente ,
        canActivate: [authorizationGuard], 
        data: { roles: ['ADMIN'] } 
      },
       { path: 'pago-estudiante/:idEstudiante', component: PagoEstudiante ,
      },
      { path: 'materia-docente/:idDocente', component: PagoEstudiante ,
      },
      { path: 'new-pago/:idEstudiante', component: NewPago
       },
      { path: 'pagos/editar/:idPago', component: NewPago
       }
    ]
  }
];
