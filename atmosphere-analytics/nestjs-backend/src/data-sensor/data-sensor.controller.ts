import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/guard/jwt.guard';
import { DataSensorService } from './data-sensor.service';

@Controller('data-sensor')
export class DataSensorController {
  constructor(private dataSensorService: DataSensorService) {}

  @UseGuards(JwtAuthGuard)
  @Get('country-sensors')
  getCountrySensors(@Body() body: { countryCode: string }) {
    return this.dataSensorService.getCountrySensors(body.countryCode);
  }

  @UseGuards(JwtAuthGuard)
  @Get('unique-sensors')
  getUniqueSensors() {
    return this.dataSensorService.getUniqueSensors();
  }

  @UseGuards(JwtAuthGuard)
  @Get('grouped-sensors')
  getGroupedSensors() {
    return this.dataSensorService.getGroupedSensors();
  }

  @UseGuards(JwtAuthGuard)
  @Post('closest-sensor')
  getClosestSensor(
    @Body() body: { latitude: string; longitude: string },
    @Request() req,
  ) {
    return this.dataSensorService.getClosestSensor(
      body.latitude,
      body.longitude,
      req.user.payload.user,
    );
  }
}
