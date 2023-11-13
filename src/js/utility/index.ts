export const QUARTER_STARTS = [
    new Date(Date.UTC(2023, 0, 1)),
    new Date(Date.UTC(2023, 3, 1)),
    new Date(Date.UTC(2023, 6, 1)),
    new Date(Date.UTC(2023, 9, 1)),
]

export interface Week {
    nr: number,
    startDate: Date
}

export const isDateInWeek = (week: Week, date: Date): boolean => {
    const d = new Date(week.startDate)
    const endDate = new Date(d.setDate(d.getDate() + 7))
    const result =  week.startDate <= date && date < endDate
    return result
}

export const getQuarter = (date: Date): number => {
    let result = 0
    for (let i = 0; i < QUARTER_STARTS.length; i++) {
        if(date > QUARTER_STARTS[i]){
            result = i
        }
    }
    return result
}

export const getYearInWeeks = (startOfYear: Date): Week[] => {
    let weeks = []

    const date = new Date(startOfYear)
    const day = date.getUTCDay()
    if(day > 4 || day === 0){ // past thursday, count from next week
        while(date.getUTCDay() !== 1){
            date.setDate(date.getDate() + 1)
        }
    }

    const nextYear = new Date(startOfYear)
    nextYear.setFullYear(startOfYear.getFullYear() + 1)
    for (let i = 0; i < 52; i++) {
        if(date <= nextYear){
            const d = {
                nr: i + 1,
                startDate: new Date(date)
            }
            weeks.push(d)
            date.setDate(date.getDate() + 7)
        }
    }
    return weeks
}