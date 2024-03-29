import { Router } from 'express';

import appointmentsRouter from '@modules/appoitments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';


const routes = Router();


routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);


//routes.get("/", (request, response) =>{
 // return response.json({ message: "Hello GosStack!" });
//})

export default routes;
