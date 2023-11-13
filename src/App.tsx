import React from 'react';
import { getQuarter, getYearInWeeks } from './js/utility';
import { Table } from './js/components/Table';

interface AppProps {
  startOfYear?: Date
  currentQuarter: number
}

function App(props: AppProps) {
  const start = props.startOfYear ? props.startOfYear : Date.UTC(2023, 0, 1)
  const weeks = getYearInWeeks(new Date(start))
  const currentQuarter = props.hasOwnProperty('currentQuarter') ? props.currentQuarter : getQuarter(new Date(Date.now()))
  return (
    <div>
      <header>
        <Table weeks={weeks} currentQuarter={currentQuarter} />
      </header>
    </div>
  );
}

export default App;
