import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appoitments/repositories/AppointmentsRepository'; // repositories/AppointmentsRepository
import CreateAppointmentService from '@modules/appoitments/services/CreateAppointmentService'; //services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// Rota GET
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

// Rota POST
appointmentsRouter.post('/', async (request, response) => {


    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    });

    return response.json(appointment);



});

export default appointmentsRouter;
