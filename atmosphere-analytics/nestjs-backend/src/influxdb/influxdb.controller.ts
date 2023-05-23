import { Controller, Get, Request, Delete, Post, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/jwt/guard/jwt.guard';
import { InfluxDBService } from './influxdb.service';

@Controller('influxdb')
export class InfluxDBController {
  constructor(private influxDBService: InfluxDBService) {}

  @Get('/checks/:checkId')
  getCheck(@Request() req) {
    return this.influxDBService.getCheck(req.params.checkId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/checks')
  deleteCheck(@Request() req) {
    return this.influxDBService.deleteCheck(req.user.payload.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/checks')
  createCheck(
    @Body() body: { airSensorId: string; frequency: string; pm: number },
    @Request() req,
  ) {
    return this.influxDBService.createCheck(
      body.airSensorId,
      body.frequency,
      body.pm,
      req.user.payload.user,
    );
  }
}
