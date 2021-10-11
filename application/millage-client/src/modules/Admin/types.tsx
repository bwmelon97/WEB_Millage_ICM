import {Role} from '@constants';
import {UserData} from '@modules/User/types';
import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

interface UnitData{
    id: number;
    name: string;
    isConfiremd: boolean;
    admins?: [];
}

export interface AdminState {
    result: string;
    role?: string;
    users?: UserData[];
    message?: string;
    page?: string;
    units?: UnitData[];
}


export type AdminAction = ActionType<typeof actions>;

