import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ResearcherAuthGuard extends AuthGuard('researcher') {}
