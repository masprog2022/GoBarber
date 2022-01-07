import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';


class AppointmentsRepository implements IAppointmentsRepository {

   private ormRepository: Repository<Appointment>;

   constructor (){

      this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
  public async create({provider_id, date }: ICreateAppointmentDTO): Promise<Appointment>{

    const appointment = this.ormRepository.create({provider_id, date})

    await this.ormRepository.save(appointment);

    return appointment;
  }
}



export default AppointmentsRepository;
