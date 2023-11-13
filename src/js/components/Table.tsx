import { Week } from "../utility"
import { QUARTER_STARTS } from "../utility"

interface TableProps {
    weeks: Week[],
    currentQuarter: number
}

const renderWeek = (week: Week) => {
    const date = week.startDate
    const day = date.getDate()
    const month = date.getMonth() + 1
    return <th key={String(day + month)}>
        <div>
            <p>Week {week.nr}</p>
            <p>{day}/{month}/{date.getFullYear()}</p>
        </div>
    </th>
}

export const Table = ({weeks, currentQuarter}: TableProps) => {
    let endDate = new Date(QUARTER_STARTS[currentQuarter + 1 > 3 ? 0 : currentQuarter + 1])
    if(currentQuarter + 1 > 3){
        endDate.setFullYear(endDate.getFullYear() + 1)
    }
    const relevantWeeks = weeks.filter(function(week: Week){
                return week.startDate <= endDate && week.startDate > QUARTER_STARTS[currentQuarter] 
              }).map(renderWeek)

    return ( 
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              {relevantWeeks}
            </tr>
          </thead>
        </table>
 )
}