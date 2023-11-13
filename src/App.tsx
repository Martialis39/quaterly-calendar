import React from 'react';
import { getQuarter, getYearInWeeks } from './js/utility';
import { Table } from './js/components/Table';
import { Task } from './js/utility';

interface AppProps {
  startOfYear?: Date
  currentQuarter: number
}

function App(props: AppProps) {
  const start = props.startOfYear ? props.startOfYear : Date.UTC(2023, 0, 1)
  const weeks = getYearInWeeks(new Date(start))
  const currentQuarter = props.hasOwnProperty('currentQuarter') ? props.currentQuarter : getQuarter(new Date(Date.now()))

  const task: Task = {
    start: new Date(Date.UTC(2023, 0, 23)),
    end: new Date(Date.UTC(2023, 1, 12)),
    title: "test",
    description: "description"
  }

  return (
    <div>
      <header>
        <Table weeks={weeks} currentQuarter={currentQuarter} tasks={ [task] } />
      </header>
    </div>
  );
}

export default App;
