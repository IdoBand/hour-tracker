export interface User {
    email: string
    name: string
    image?: string
    lastLogin?: string
    firstLogin?: string
}

export interface WorkPlace {
    id?: string
    userId: string
    name: string
    employmentStartDate: string | Date
    employmentEndDate: string | Date | null
    lastShift: string | Date | null
    isCurrent: boolean
    wagePerHour: number
    isBreakPaid: boolean
    // frontend only properties
    shifts?: Shift[]
    totalHours?: string | number
    hoursPastWeek?: string | number
    hoursPastMonth?: string | number
    employmentDuration?: string
}

export interface Shift {
    id?: string
    userId: string
    workPlaceId: string,
    shiftStart: Date 
    shiftEnd: Date
    breakStart: Date | null
    breakEnd: Date | null
    iWorkedOn: string
    notes: string
    checked?: boolean
    wagePerHour: number,
    tipBonus: number
    isBreakPaid: boolean
}