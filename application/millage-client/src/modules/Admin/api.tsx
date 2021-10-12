import {Role} from '@constants';
import axios from 'axios';
import {SERVER} from '@constants';
import {AdminState} from './types';

export async function getUserList(role: string): Promise<AdminState> {
  try {
    const users = await axios.get(`${SERVER}/user/role/${role}`,
        {withCredentials: true});
    return users.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function getUnitList(): Promise<AdminState> {
  try {
    const units = await axios.get(`${SERVER}/unit/listForSuperAdmin`,
        {withCredentials: true});
    return units.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function authUserApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/user/${id}`, {
      isConfirmed: true,
    }, {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function authUnitApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/unit/${id}`, {
      isConfirmed: true,
    }, {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function deleteUserApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.delete(`${SERVER}/user/${id}`,
        {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function deleteUnitApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.delete(`${SERVER}/unit/${id}`,
        {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function updateUserRoleApi(id: number,
    roleId: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/user/${id}`, {
      roleId: roleId,
    }, {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}
