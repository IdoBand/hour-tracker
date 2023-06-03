import { WorkPlace } from "@/app/dashboard/WorkPlace"
import { Shift } from "@/app/dashboard/workPlaceStats/Shift"

import {
  format,
  startOfToday,
  subMonths
} from 'date-fns'

const today = startOfToday()
const currentMonth = format(today, 'MM')
const currentYear = format(today, 'yyy')
const lastMonth = format(subMonths(today, 1), 'MM')


export const SHIFTS: Shift[] = [
    {
      shiftId: '1',
      placeId: '3',
      shiftStart: `${currentYear}-${currentMonth}-20T13:00`,
      shiftEnd: `${currentYear}-${currentMonth}-20T19:00`,
      breakStart: `${currentYear}-${currentMonth}-20T19:00`,
      breakEnd: `${currentYear}-${currentMonth}-20T19:40`,
      iWorkedOn: `Lorem ipsum dolor sit amet. Est omnis quisquam eos obcaecati provident sed architecto recusandae ut illo voluptate qui rerum porro. Qui quod maiores et asperiores dolor et sunt maiores vel consequatur enim ad quos nulla et placeat amet. Eum debitis veniam et repudiandae minima 33 expedita dolorum eos dolor nostrum.`,
      notes: 'dont forget to complete the boss`s task next week',
      checked: false
    },
    {
      shiftId: '2',
      placeId: '3',
      shiftStart: `${currentYear}-${currentMonth}-21T12:30`,
      shiftEnd: `${currentYear}-${currentMonth}-21T20:00`,
      breakStart: `${currentYear}-${currentMonth}-21T20:00`,
      breakEnd: `${currentYear}-${currentMonth}-21T20:30`,
      iWorkedOn: `Lorem ipsum dolor sit amet. Est omnis quisquam eos obcaecati provident sed architecto recusandae ut illo voluptate qui rerum porro. Qui quod maiores et asperiores dolor et sunt maiores vel consequatur enim ad quos nulla et placeat amet. Eum debitis veniam et repudiandae minima 33 expedita dolorum eos dolor nostrum.`,
      notes: '',
      checked: false
    },
    {
      shiftId: '3',
      placeId: '3',
      shiftStart: `${currentYear}-${currentMonth}-22T08:00`,
      shiftEnd: `${currentYear}-${currentMonth}-22T16:00`,
      breakStart: `${currentYear}-${currentMonth}-22T16:00`,
      breakEnd: `${currentYear}-${currentMonth}-22T16:00`,
      iWorkedOn: '',
      notes: 'added a new project feature',
      checked: false
    },
    {
      shiftId: '4',
      placeId: '3',
      shiftStart: `${currentYear}-${lastMonth}-03T16:00`,
      shiftEnd: `${currentYear}-${lastMonth}-03T21:00`,
      breakStart: `${currentYear}-${lastMonth}-03T19:00`,
      breakEnd: `${currentYear}-${lastMonth}-03T19:00`,
      iWorkedOn: `this is a random string`,
      notes: 'dont forget to complete the boss`s task next week',
      checked: false
    },
    {
      shiftId: '5',
      placeId: '3',
      shiftStart: `${currentYear}-${lastMonth}-05T12:45`,
      shiftEnd: `${currentYear}-${lastMonth}-05T20:00`,
      breakStart: `${currentYear}-${lastMonth}-05T20:10`,
      breakEnd: `${currentYear}-${lastMonth}-05T20:30`,
      iWorkedOn: `Lorem ipsum dolor sit amet. Est omnis quisquam eos obcaecati provident sed architecto recusandae ut illo voluptate qui rerum porro. Qui quod maiores et asperiores dolor et sunt maiores vel consequatur enim ad quos nulla et placeat amet. Eum debitis veniam et repudiandae minima 33 expedita dolorum eos dolor nostrum.`,
      notes: '',
      checked: false
    },
    {
      shiftId: '6',
      placeId: '3',
      shiftStart: `${currentYear}-${lastMonth}-17T09:00`,
      shiftEnd: `${currentYear}-${lastMonth}-17T14:00`,
      breakStart: `${currentYear}-${lastMonth}-19T10:05`,
      breakEnd: `${currentYear}-${lastMonth}-19T10:25`,
      iWorkedOn: '',
      notes: 'added a new project feature',
      checked: false
    },
    {
      shiftId: '7',
      placeId: '3',
      shiftStart: `${currentYear}-${lastMonth}-19T09:00`,
      shiftEnd: `${currentYear}-${lastMonth}-19T17:00`,
      breakStart: `${currentYear}-${lastMonth}-19T16:00`,
      breakEnd: `${currentYear}-${lastMonth}-19T16:00`,
      iWorkedOn: '',
      notes: 'added a new project feature',
      checked: false
    },
  ]
  
const place1: WorkPlace = {
    placeId: '1',
    name: 'WORK PLACE NAME 1',
    employmentStartDate: '2022-05-11T13:00',
    employmentEndDate: '${currentYear}-05-11T13:00',
    isCurrent: false,
    totalHours: 2056,
    wagePerHour: 44,
    isBreakPaid: true,
    link: '',
    checked: false,
    shifts: SHIFTS
}
const place2: WorkPlace = {
    placeId: '2',
    name: 'WORK PLACE NAME 2',
    employmentStartDate: '2019-05-11T13:00',
    employmentEndDate: '2021-10-11T13:00',
    isCurrent: false,
    totalHours: 2056,
    wagePerHour: 44,
    isBreakPaid: false,
    link: '',
    checked: false,
    shifts: SHIFTS
    
}
const place3: WorkPlace = {
    placeId: '3',
    name: 'WORK PLACE NAME 3',
    employmentStartDate: '2012-12-11T13:00',
    employmentEndDate: '2019-05-11T13:00',
    isCurrent: true,
    totalHours: 2056,
    wagePerHour: 44,
    isBreakPaid: true,
    link: '',
    checked: false,
    shifts: SHIFTS
    
}


export const PLACES_OF_WORK: WorkPlace[] = [place1, place2, place3]