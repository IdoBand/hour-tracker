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

// export class Shift {
//     shiftId: string
//     date: string
//     shiftStart: string
//     ShiftEnd: string
//     breakStart: string
//     breakEnd: string
//     iWorkedOn: string
//     notes: string
//     checked: boolean
//     constructor(shiftId: string, date: string, shiftStart: string, shiftEnd: string, breakStart: string='', breakEnd: string='', iWorkedOn: string='', notes: string='') {
//         this.shiftId = shiftId
//         this.date = date
//         this.shiftStart = shiftStart
//         this.ShiftEnd = shiftEnd
//         this.breakStart = breakStart
//         this.breakEnd = breakEnd
//         this.iWorkedOn = iWorkedOn
//         this.notes = notes
//         this.checked = false
//     }
//     calculateShiftDuration() {

//     }
// }