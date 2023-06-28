import { WorkPlace } from "@/app/dashboard/WorkPlace"
import { Shift } from "@/app/dashboard/[workPlaceId]/Shift"

import {
  format,
  startOfToday,
  subMonths
} from 'date-fns'

const today = startOfToday()
const currentMonth = format(today, 'MM')
const currentYear = format(today, 'yyy')
const lastMonth = format(subMonths(today, 1), 'MM')

const loremIpsumParagraph = `Lorem ipsum dolor sit amet. Est omnis quisquam eos obcaecati provident sed architecto recusandae ut illo voluptate qui rerum porro. Qui quod maiores et asperiores dolor et sunt maiores vel consequatur enim ad quos nulla et placeat amet. Eum debitis veniam et repudiandae minima 33 expedita dolorum eos dolor nostrum.`

export interface User {
  userId: string
  email: string
  firstName: string
  lastName: string
  lastLogin?: string
}

export const dummyUser = {
  userId: '123456',
  email: 'dummyuser@gmail.com',
  firstName: 'Dummy',
  lastName: 'User',
  lastLogin: 'time string',
}

export const SHIFTS3: Shift[] = [
    {
      shiftId: '1',
      placeId: '3',
      shiftStart: `${currentYear}-${currentMonth}-20T13:00`,
      shiftEnd: `${currentYear}-${currentMonth}-20T19:00`,
      breakStart: `${currentYear}-${currentMonth}-20T18:00`,
      breakEnd: `${currentYear}-${currentMonth}-20T18:40`,
      iWorkedOn: loremIpsumParagraph,
      notes: 'don`t forget to complete the boss`s task next week',
      wagePerHour: 56,
      tipBonus: 0,
      checked: false
    },
    {
      shiftId: '2',
      placeId: '3',
      shiftStart: `${currentYear}-${currentMonth}-21T12:30`,
      shiftEnd: `${currentYear}-${currentMonth}-21T20:00`,
      breakStart: `${currentYear}-${currentMonth}-21T16:20`,
      breakEnd: `${currentYear}-${currentMonth}-21T16:50`,
      iWorkedOn: loremIpsumParagraph,
      notes: '',
      wagePerHour: 56,
      tipBonus: 0,
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
      wagePerHour: 56,
      tipBonus: 0,
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
      wagePerHour: 56,
      tipBonus: 0,
      checked: false
    },
    {
      shiftId: '5',
      placeId: '3',
      shiftStart: `${currentYear}-${lastMonth}-05T12:45`,
      shiftEnd: `${currentYear}-${lastMonth}-05T20:00`,
      breakStart: `${currentYear}-${lastMonth}-05T15:15`,
      breakEnd: `${currentYear}-${lastMonth}-05T15:30`,
      iWorkedOn: loremIpsumParagraph,
      notes: '',
      wagePerHour: 56,
      tipBonus: 0,
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
      wagePerHour: 56,
      tipBonus: 0,
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
      wagePerHour: 56,
      tipBonus: 0,
      checked: false
    },
  ]
export const SHIFTS1: Shift[] = [
  {
    shiftId: '1',
    placeId: '3',
    shiftStart: `${currentYear}-${currentMonth}-20T10:00`,
    shiftEnd: `${currentYear}-${currentMonth}-20T17:00`,
    breakStart: `${currentYear}-${currentMonth}-20T13:00`,
    breakEnd: `${currentYear}-${currentMonth}-20T13:20`,
    iWorkedOn: loremIpsumParagraph,
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '2',
    placeId: '3',
    shiftStart: `${currentYear}-${currentMonth}-21T08:00`,
    shiftEnd: `${currentYear}-${currentMonth}-21T17:00`,
    breakStart: `${currentYear}-${currentMonth}-21T14:30`,
    breakEnd: `${currentYear}-${currentMonth}-21T14:50`,
    iWorkedOn: '',
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '3',
    placeId: '3',
    shiftStart: `${currentYear}-${currentMonth}-22T08:30`,
    shiftEnd: `${currentYear}-${currentMonth}-22T17:00`,
    breakStart: `${currentYear}-${currentMonth}-22T13:15`,
    breakEnd: `${currentYear}-${currentMonth}-22T13:35`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '4',
    placeId: '3',
    shiftStart: `${currentYear}-${lastMonth}-03T10:00`,
    shiftEnd: `${currentYear}-${lastMonth}-03T17:00`,
    breakStart: `${currentYear}-${lastMonth}-03T13:30`,
    breakEnd: `${currentYear}-${lastMonth}-03T13:50`,
    iWorkedOn: '',
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '5',
    placeId: '3',
    shiftStart: `${currentYear}-${lastMonth}-05T08:30`,
    shiftEnd: `${currentYear}-${lastMonth}-05T17:00`,
    breakStart: `${currentYear}-${lastMonth}-05T13:15`,
    breakEnd: `${currentYear}-${lastMonth}-05T13:40`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '6',
    placeId: '3',
    shiftStart: `${currentYear}-${lastMonth}-17T10:00`,
    shiftEnd: `${currentYear}-${lastMonth}-17T17:00`,
    breakStart: `${currentYear}-${lastMonth}-17T13:05`,
    breakEnd: `${currentYear}-${lastMonth}-17T13:25`,
    iWorkedOn: '',
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '7',
    placeId: '3',
    shiftStart: `${currentYear}-${lastMonth}-19T08:30`,
    shiftEnd: `${currentYear}-${lastMonth}-19T17:00`,
    breakStart: `${currentYear}-${lastMonth}-19T13:45`,
    breakEnd: `${currentYear}-${lastMonth}-19T14:05`,
    iWorkedOn: '',
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  // Additional shifts with placeId '3'
  {
    shiftId: '8',
    placeId: '3',
    shiftStart: `${currentYear}-${currentMonth}-10T10:00`,
    shiftEnd: `${currentYear}-${currentMonth}-10T17:00`,
    breakStart: `${currentYear}-${currentMonth}-10T13:30`,
    breakEnd: `${currentYear}-${currentMonth}-10T13:50`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '9',
    placeId: '3',
    shiftStart: `${currentYear}-${currentMonth}-12T08:00`,
    shiftEnd: `${currentYear}-${currentMonth}-12T17:00`,
    breakStart: `${currentYear}-${currentMonth}-12T13:45`,
    breakEnd: `${currentYear}-${currentMonth}-12T14:05`,
    iWorkedOn: '',
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '10',
    placeId: '3',
    shiftStart: `${currentYear}-${currentMonth}-15T08:30`,
    shiftEnd: `${currentYear}-${currentMonth}-15T17:00`,
    breakStart: `${currentYear}-${currentMonth}-15T14:15`,
    breakEnd: `${currentYear}-${currentMonth}-15T14:35`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  }
];
  
export const SHIFTS2: Shift[] = [
  {
    shiftId: '1',
    placeId: '2',
    shiftStart: `${currentYear}-${currentMonth}-20T09:00`,
    shiftEnd: `${currentYear}-${currentMonth}-20T17:00`,
    breakStart: `${currentYear}-${currentMonth}-20T13:00`,
    breakEnd: `${currentYear}-${currentMonth}-20T13:20`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '2',
    placeId: '2',
    shiftStart: `${currentYear}-${currentMonth}-21T09:00`,
    shiftEnd: `${currentYear}-${currentMonth}-21T17:00`,
    breakStart: `${currentYear}-${currentMonth}-21T14:30`,
    breakEnd: `${currentYear}-${currentMonth}-21T14:50`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '3',
    placeId: '2',
    shiftStart: `${currentYear}-${currentMonth}-22T09:00`,
    shiftEnd: `${currentYear}-${currentMonth}-22T17:00`,
    breakStart: `${currentYear}-${currentMonth}-22T13:15`,
    breakEnd: `${currentYear}-${currentMonth}-22T13:35`,
    iWorkedOn: '',
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '4',
    placeId: '2',
    shiftStart: `${currentYear}-${lastMonth}-03T09:00`,
    shiftEnd: `${currentYear}-${lastMonth}-03T17:00`,
    breakStart: `${currentYear}-${lastMonth}-03T13:30`,
    breakEnd: `${currentYear}-${lastMonth}-03T13:50`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '5',
    placeId: '2',
    shiftStart: `${currentYear}-${lastMonth}-05T09:00`,
    shiftEnd: `${currentYear}-${lastMonth}-05T17:00`,
    breakStart: `${currentYear}-${lastMonth}-05T13:15`,
    breakEnd: `${currentYear}-${lastMonth}-05T13:40`,
    iWorkedOn: '',
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '6',
    placeId: '2',
    shiftStart: `${currentYear}-${lastMonth}-17T09:00`,
    shiftEnd: `${currentYear}-${lastMonth}-17T17:00`,
    breakStart: `${currentYear}-${lastMonth}-17T13:05`,
    breakEnd: `${currentYear}-${lastMonth}-17T13:25`,
    iWorkedOn: '',
    notes: loremIpsumParagraph,
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
  {
    shiftId: '7',
    placeId: '2',
    shiftStart: `${currentYear}-${lastMonth}-19T09:00`,
    shiftEnd: `${currentYear}-${lastMonth}-19T17:00`,
    breakStart: `${currentYear}-${lastMonth}-19T13:45`,
    breakEnd: `${currentYear}-${lastMonth}-19T14:05`,
    iWorkedOn: loremIpsumParagraph,
    notes: '',
    wagePerHour: 44,
    tipBonus: 0,
    checked: false
  },
];

const place1: WorkPlace = {
  placeId: '1',
  name: 'DreamScape Designs',
  employmentStartDate: '2022-05-11T13:00',
  employmentEndDate: '2023-05-11T13:00',
  isCurrent: false,
  wagePerHour: 44,
  isBreakPaid: true,
  link: '',
  checked: false,
  shifts: SHIFTS1
}
const place2: WorkPlace = {
  placeId: '2',
  name: 'Zenith Ventures',
  employmentStartDate: '2019-05-11T13:00',
  employmentEndDate: '2021-10-11T13:00',
  isCurrent: false,
  wagePerHour: 44,
  isBreakPaid: false,
  link: '',
  checked: false,
  shifts: SHIFTS2
  
}
const place3: WorkPlace = {
  placeId: '3',
  name: 'StellarSynergy Solutions',
  employmentStartDate: '2012-12-11T13:00',
  employmentEndDate: '2019-05-11T13:00',
  isCurrent: true,
  wagePerHour: 56,
  isBreakPaid: true,
  link: '',
  checked: false,
  shifts: SHIFTS3
  
}


export const PLACES_OF_WORK: WorkPlace[] = [place1, place2, place3]

export const emptyWorkPlace = {
  placeId: '',
  name: '',
  employmentStartDate: '',
  employmentEndDate: '',
  isCurrent: false,
  wagePerHour: 56,
  isBreakPaid: false,
  link: '',
  checked: false,
  shifts: []
}