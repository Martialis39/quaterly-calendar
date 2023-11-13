import { useState } from "react"
import { Task, Week, isDateInWeek } from "../utility"
import { QUARTER_STARTS } from "../utility"
import styles from './Table.module.css'

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
        <div className={styles.tableCell}>
            <p>Week {week.nr}</p>
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
                        return <td className={styles.active} />
                    } else {
                        return <td />
                    }
                })}
            </tr>)
    })
}

export const Table = ({weeks, currentQuarter, tasks}: TableProps) => {
    const [quarter, setQuarter] = useState<number>(currentQuarter)
    let endDate = new Date(QUARTER_STARTS[quarter + 1 > 3 ? 0 : quarter + 1])
    if(quarter + 1 > 3){
        endDate.setFullYear(endDate.getFullYear() + 1)
    }
    const relevantWeeks = weeks.filter(function(week: Week){
                return week.startDate <= endDate && week.startDate > QUARTER_STARTS[quarter] 
              })
              
    const tableHeaders = relevantWeeks.map(renderWeekHeader)

    return ( 
        <>
            <div className={styles.title}>
                <h3>Quarter {quarter + 1}</h3>
                <div className={styles.buttons}>
                    <button disabled={quarter < 1} onClick={() => {
                        setQuarter(old => {
                            return Math.max(0, old - 1)
                        })
                    }}>Prev</button>
                    <button disabled={quarter > 2} onClick={() => {
                        setQuarter(old => {
                            return Math.min(3, old + 1)
                        })
                    }}>Next</button>
                </div>

            </div>
            <div className={styles.tableWrapper}>
            <table>
            <thead>
                <tr>
                <th>Tasks</th>
                {tableHeaders}
                </tr>
                {tasks && renderTasks(tasks, relevantWeeks)}
            </thead>
            </table>
            </div>
        </>
 )
}