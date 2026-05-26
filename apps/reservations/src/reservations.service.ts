import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { switchMap, Observable } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ): Observable<ReservationDocument> {
    return this.paymentsService
      .send<{ id: string }>('create_charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        switchMap(({ id: invoiceId }) =>
          this.reservationsRepository.create({
            startDate: createReservationDto.startDate,
            endDate: createReservationDto.endDate,
            invoiceId,
            timestamp: new Date(),
            userId,
          }),
        ),
      );
  }

  findAll(): Promise<ReservationDocument[]> {
    return this.reservationsRepository.find({});
  }

  findOne(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOne({ _id });
  }

  update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
