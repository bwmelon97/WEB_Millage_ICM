import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateScheduleDto, UpdateScheduleDto} from './dto';

import {ScheduleEntity} from './schedule.entity';

const RECENT_SCHEDULE_COUNT = 5;

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async getUserSchedule(userId: number, unitId: number): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find({
      where: [{userId: userId}, {unitId: unitId}],
    });
  }

  async getRecentScheduleForUnit(unitId: number): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find({
      where: {unitId: unitId},
      order: {start: 'DESC'},
      take: RECENT_SCHEDULE_COUNT,
    });
  }

  async create(
      userId: number,
      unitId: number,
      dto: CreateScheduleDto
  ): Promise<ScheduleEntity> {
    Object.assign(dto, {userId, unitId});
    const newSchedule = this.scheduleRepository.create(dto);
    return this.scheduleRepository.save(newSchedule);
  }

  async update(
      id: number,
      userId: number,
      dto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    Object.assign(dto, {userId});
    const editedSchedule = this.scheduleRepository.create(dto);
    const updateResult = await this.scheduleRepository.update(id, editedSchedule);
    return updateResult.generatedMaps[0] as ScheduleEntity;
  }

  async delete(id: number): Promise<boolean> {
    await this.scheduleRepository.delete(id);
    return true;
  }

  async getRecentScheduleMixed(id: number, unitId: number): Promise<ScheduleEntity[]> {
    const schedules = await this.scheduleRepository.query(`
    (select * from schedule where userIdId=${id} and groupType='person' and
      schedule.start >= CURRENT_DATE and
      (schedule.end IS NULL or schedule.end > CURRENT_DATE)
    )
    union
    (
    select * from schedule where unitIdId=${unitId} and groupType='unit' and
      schedule.start >= CURRENT_DATE and
      (schedule.end IS NULL or schedule.end > CURRENT_DATE)
    )
    order by start asc limit 5
    `);
    return schedules;
  }
}
