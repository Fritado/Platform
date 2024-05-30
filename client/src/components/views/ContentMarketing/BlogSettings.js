import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import BlogAutomation from './BlogAutomation'
import { schedulePostTime, getPostScheduledTime } from '../../services/BlogTopicApi'

const BlogSettings = () => {
  const [autoPostNumber, setAutoPostNumber] = useState(1)
  const [autoPostUnit, setAutoPostUnit] = useState('days')
  const [autoPostTime, setAutoPostTime] = useState('12:00')

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  const handleStartDateChange = (date) => {
    setSelectedRange({ ...selectedRange, startDate: date })
  }

  const handleEndDateChange = (date) => {
    setSelectedRange({ ...selectedRange, endDate: date })
  }
  const isDateSelected = selectedRange.startDate && selectedRange.endDate

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postScheduleData = {
      startDate: selectedRange.startDate.toISOString(),
      endDate: selectedRange.endDate.toISOString(),
      blogAutoPostNumber: autoPostNumber,
      blogAutoPostUnit: autoPostUnit,
      blogAutoPostTime: autoPostTime,
    }
    try {
      const response = await schedulePostTime(postScheduleData)
      // console.log('Schedule response:', response)
    } catch (error) {
      console.error('Error scheduling blog post:', error)
    }
  }
  return (
    <div>
      <BlogAutomation />
      <div className="d-flex flex-column mx-4">
        <div className="bg-white px-4 py-3">
          <div className="">
            <h3>Scheduling</h3>
            <p>Lorem ipsum Lorem ipsumLorem ipsum Lorem </p>
          </div>
          <div className="d-flex flex-row gap-5 my-4">
            <form className="border border-light-subtle rounded" onSubmit={handleSubmit}>
              <div className="d-flex flex-row gap-5 p-3 align-items-center">
                <div className="">
                  <label htmlFor="start" className="pe-2">
                    <h4> Start</h4>
                  </label>
                  <DatePicker
                    selected={selectedRange.startDate}
                    onChange={handleStartDateChange}
                    className="border border-light-subtle rounded"
                  />
                </div>
                <div>
                  <label htmlFor="end" className="pe-2">
                    <h4> End</h4>
                  </label>
                  <DatePicker
                    selected={selectedRange.endDate}
                    onChange={handleEndDateChange}
                    className="border border-light-subtle rounded"
                  />
                </div>
              </div>

              <div className="d-flex flex-row p-3 align-items-center">
                <label htmlFor="autopost" className="pe-2">
                  <h4>Auto post every</h4>
                </label>

                <input
                  type="number"
                  id="autopost"
                  name="autopost"
                  min="1"
                  max="30"
                  value={autoPostNumber}
                  onChange={(e) => setAutoPostNumber(e.target.value)}
                  className="border border-light-subtle rounded me-3 py-0"
                  style={{ width: '50px', height: '30px' }}
                />

                <select
                  id="autopost-unit"
                  value={autoPostUnit}
                  onChange={(e) => setAutoPostUnit(e.target.value)}
                  className="border border-light-subtle rounded px-4 py-2"
                >
                  <option value="days">Days</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>

              <div className="d-flex  p-3 align-items-center">
                <label htmlFor="autopost-time" className="pe-2">
                  <h4>Auto post time</h4>
                </label>
                <input
                  type="time"
                  name="autopost-time"
                  value={autoPostTime}
                  onChange={(e) => setAutoPostTime(e.target.value)}
                  className="border border-light-subtle rounded me-3 py-2"
                />
              </div>

              <div className="d-flex flex-row p-3 gap-3">
                <button
                  type="button"
                  disabled={!isDateSelected}
                  className={`px-4 py-2 border-0 rounded bg-body-secondary text-body ${!isDateSelected ? 'btn-disabled' : ''}`}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border-0 rounded">
                  Save
                </button>
              </div>
            </form>

            <div className="border rounded p-3">
              <h3>Let's display dates</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSettings
