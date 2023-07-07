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
    employmentStartDate: string | Date | null
    employmentEndDate: string | Date | null
    lastShift: string | Date | null
    isCurrent: boolean
    wagePerHour: number
    isBreakPaid: boolean
    shifts?: Shift[]
}

export interface Shift {
    id?: string
    workPlaceId: string,
    shiftStart: string
    shiftEnd: string
    breakStart: string
    breakEnd: string
    iWorkedOn: string
    notes: string
    checked: boolean
    wagePerHour: number,
    tipBonus: number
}