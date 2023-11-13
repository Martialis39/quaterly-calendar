import { getQuarter, getYearInWeeks, isDateInWeek } from "."

describe('isDateInWeek', () => {
    const week = {nr: 1, startDate: new Date(Date.UTC(2023, 0, 2))}
    const testCases: [Date, boolean][] = [
        [new Date(Date.UTC(2023, 0, 2)), true],
        [new Date(Date.UTC(2023, 0, 4)), true],
        [new Date(Date.UTC(2023, 0, 8)), true],
        [new Date(Date.UTC(2023, 0, 9)), false],
    ]
    testCases.forEach(([date, output], i) => {

        test('Test: ' + i, () => {
            expect(isDateInWeek(week, date)).toBe(output)
        })
    })
})

describe('getQuarter', () => {

    const testCases: [Date, number][] = [
        [new Date('1.1.2023'), 0],
        [new Date('4.25.2023'), 1],
        [new Date('8.25.2023'), 2],
        [new Date('11.8.2023'), 3],
    ]

    testCases.forEach(([input, output]) => {
        test(`With ${input}, returns ${output}`, () =>{
            expect(getQuarter(input)).toBe(output)
        })
    })
})


describe('getWeeksInQuarter', () => {
    test('returns the first week', () => {
        const startOfYear = new Date(Date.UTC(2023, 0, 1))
        const result = getYearInWeeks(startOfYear)
        expect(result[0]).toStrictEqual({nr: 1, startDate: new Date('2023-01-02T00:00:00.000Z')})
    })
    test('returns the last week', () => {
        const startOfYear = new Date(Date.UTC(2023, 0, 1))
        const result = getYearInWeeks(startOfYear)
        expect(result[51]).toStrictEqual({nr: 52, startDate: new Date('2023-12-25T00:00:00.000Z')})
    })
})