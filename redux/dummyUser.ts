import { WorkPlace } from "@/types/types"
import { Shift } from "@/types/types"

import {
  format,
  startOfToday,
  subMonths
} from 'date-fns'

const today = startOfToday()


const loremIpsumParagraph = `Lorem ipsum dolor sit amet. Est omnis quisquam eos obcaecati provident sed architecto recusandae ut illo voluptate qui rerum porro. Qui quod maiores et asperiores dolor et sunt maiores vel consequatur enim ad quos nulla et placeat amet. Eum debitis veniam et repudiandae minima 33 expedita dolorum eos dolor nostrum.`

export interface User {

  email: string
  name: string
  image?: string
  lastLogin?: string
  firstLogin?: string
}


export const dummyUser = {
  email: 'dummyuser@dumdum.com',
  password: '1234',
  name: 'DummyUser',
}


const place1: WorkPlace = {
  id: '1',
  userId: '',
  name: 'DreamScape Designs',
  employmentStartDate: '2022-05-11T13:00',
  employmentEndDate: '2023-05-11T13:00',
  lastShift: '',
  isCurrent: false,
  wagePerHour: 44,
  isBreakPaid: true,
  shifts: []
}
const place2: WorkPlace = {
  id: '2',
  userId: '',
  name: 'Zenith Ventures',
  employmentStartDate: '2019-05-11T13:00',
  employmentEndDate: '2021-10-11T13:00',
  lastShift: '',
  isCurrent: false,
  wagePerHour: 44,
  isBreakPaid: false,
  shifts: []
  
}
const place3: WorkPlace = {
  id: '3',
  userId: '',
  name: 'StellarSynergy Solutions',
  employmentStartDate: '2012-12-11T13:00',
  employmentEndDate: '2019-05-11T13:00',
  lastShift: '',
  isCurrent: true,
  wagePerHour: 56,
  isBreakPaid: true,
  shifts: []
  
}


export const PLACES_OF_WORK: WorkPlace[] = [place1, place2, place3]

export const emptyWorkPlace: WorkPlace = {
  id: '',
  userId: '',
  name: '',
  employmentStartDate: '',
  employmentEndDate: '',
  lastShift: '',
  isCurrent: false,
  wagePerHour: 56,
  isBreakPaid: false,
  shifts: []
}