import { Task, Week, isDateInWeek } from "../utility"
import { QUARTER_STARTS } from "../utility"

interface TableProps {
    weeks: Week[],
    currentQuarter: number
    tasks?: Task[]
}

const renderWeekHeader = (week: Week) => {
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

const renderTasks = (tasks: Task[], relevantWeeks: Week[]) => {
    return tasks.map(task => {
            return (<tr>
                Test
                {relevantWeeks.map((week: Week) => {
                    const isStartDateWithinWeek = isDateInWeek(week, task.start)
                    if((week.startDate >= task.start || isStartDateWithinWeek) && week.startDate <= task.end){
                        return <td>{'IN'}</td>
                    } else {
                        return <td>{'OUT'}</td>
                    }
                })}
            </tr>)
    })
}

export const Table = ({weeks, currentQuarter, tasks}: TableProps) => {
    let endDate = new Date(QUARTER_STARTS[currentQuarter + 1 > 3 ? 0 : currentQuarter + 1])
    if(currentQuarter + 1 > 3){
        endDate.setFullYear(endDate.getFullYear() + 1)
    }
    const relevantWeeks = weeks.filter(function(week: Week){
                return week.startDate <= endDate && week.startDate > QUARTER_STARTS[currentQuarter] 
              })
              
    const tableHeaders = relevantWeeks.map(renderWeekHeader)

    return ( 
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              {tableHeaders}
            </tr>
            {tasks && renderTasks(tasks, relevantWeeks)}
          </thead>
        </table>
 )
}