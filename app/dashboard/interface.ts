export const PLACES_OF_WORK = [
    {
    placeId: 'thisis1',
    name: 'WORK PLACE NAME 1',
    employmentStartDate: '22-10-2018',
    employmentEndDate: '10-04-2022',
    employmentDuration: '5 month and 11 days',
    isCurrent: true,
    hoursPastWeek: '33',
    hoursPastMonth: '246',
    totalHours: '2008',
    link: '',
    checked: false,
    },
    {
    placeId: 'thisis2',
    name: 'WORK PLACE NAME 2',
    employmentStartDate: '22-10-2018',
    employmentEndDate: '10-04-2022',
    employmentDuration: '5 month and 11 days',
    isCurrent: false,
    hoursPastWeek: '33',
    hoursPastMonth: '246',
    totalHours: '2008',
    link: '',
    checked: false,
    },
    {
    placeId: 'thisis3',
    name: 'WORK PLACE NAME 3',
    employmentStartDate: '22-10-2018',
    employmentEndDate: '10-04-2022',
    employmentDuration: '5 month and 11 days',
    isCurrent: false,
    hoursPastWeek: '33',
    hoursPastMonth: '246',
    totalHours: '2008',
    link: '',
    checked: false,
    },
]

export interface WorkPlace {
    placeId: string
    name: string
    employmentStartDate: string,
    employmentEndDate: string,
    employmentDuration: string,
    isCurrent: boolean
    hoursPastWeek: string
    hoursPastMonth: string,
    totalHours: string,
    link: string,
    checked: boolean
}
export interface Shift {
    shiftId: string
    date: string
    shiftStart: string
    ShiftEnd: string
    breakStart: string
    breakEnd: string
    iWorkedOn: string
    notes: string
    checked: boolean
}
export interface FormProps {
    actionOnSubmit: any
}