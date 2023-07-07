export interface DBUser {
    id: string
    email: string
    firstName: string
    lastName: string
    password?: string
    lastLogin: Date
    firstLogin: Date
}

export interface DBWorkPlace {
    id: string
    userId: string
    name: string
    employmentStartDate: Date 
    employmentEndDate: Date
    isCurrent: boolean
    wagePerHour: number
    isBreakPaid: boolean
}