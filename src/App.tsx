import React, { useState } from 'react';
import { getQuarter, getYearInWeeks } from './js/utility';
import { Table } from './js/components/Table';
import { Task } from './js/utility';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from './App.module.css';

interface AppProps {
  startOfYear?: Date
  currentQuarter: number
}

interface IFormData {
  start: Date
  end: Date
  title: string
  description: string
}

  const exampleTask: Task = {
    start: new Date(Date.UTC(2023, 10, 23)),
    end: new Date(Date.UTC(2023, 11, 12)),
    title: "test",
    description: "description"
  }

function App(props: AppProps) {
  const start = props.startOfYear ? props.startOfYear : Date.UTC(2023, 0, 1)
  const weeks = getYearInWeeks(new Date(start))
  const currentQuarter = props.hasOwnProperty('currentQuarter') ? props.currentQuarter : getQuarter(new Date(Date.now()))
  const [tasks, setTasks] = useState<Task[]>([exampleTask])

  const [formData, setFormData] = useState<IFormData>({
    start: new Date('2023-01-01'),
    end: new Date('2023-01-07'),
    title: "Example!",
    description: "Hi!"
  })


  return (
    <div className={styles.app}>
      <header>
        <Table weeks={weeks} currentQuarter={currentQuarter} tasks={tasks} />
      </header>
      <main>
        <form className={styles.mainForm} onSubmit={e => {
          e.preventDefault()
          setTasks(old => {
            if(old.length > 9){
              return old // Restrict to 10 tasks
            }
            return [...old, formData]
          })
        }}>
          <div>
            <label>Pick a start date
              <DatePicker selected={formData.start} onChange={e => {
                setFormData((old): IFormData => {
                  if (e) {
                    return { ...old, start: e }
                  }
                  return old
                })
              }}></DatePicker>
            </label>
          </div>
          <div>
            <label>Pick an end date

              <DatePicker selected={formData.end} onChange={e => {
                setFormData((old): IFormData => {
                  if (e) {
                    return { ...old, end: e }
                  }
                  return old
                })
              }}></DatePicker>
            </label>
          </div>
          <div>
            <label htmlFor="name">Pick a title</label>
            <input type="text" name='name' value={formData.title} onChange={e => {
              setFormData((old): IFormData => {
                if (e.target.value) {
                  return { ...old, title: e.target.value }
                }
                return old
              })
            }} />
          </div>
          <div>
            <label htmlFor="description">Pick a description</label>
            <input type="text" name='description' value={formData.description} onChange={e => {
              setFormData((old): IFormData => {
                if (e.target.value) {
                  return { ...old, description: e.target.value }
                }
                return old
              })
            }} />
          </div>
          <div>
            <input type="submit" value="Add task!" />
          </div>
        </form>
      </main>
    </div >
  );
}

export default App;
