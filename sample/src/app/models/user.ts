import { Timestamp } from "rxjs/internal/operators/timestamp";

export class User {
    id: string;
    avatar: string;
    name: string;
    email: string;
    phone: string;
    email_verified: string;
    password: string;
    passwordConfirm: string;
    active_status: number;
    created_at: string;
}