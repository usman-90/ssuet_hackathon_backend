import { Request } from 'express';
import { UserPayload } from 'src/auth/interfaces/user_payload.interface';

export interface UserPayloadRequest extends Request {
  user: UserPayload;
}

