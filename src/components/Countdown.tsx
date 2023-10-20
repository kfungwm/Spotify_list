'use client'
import React, { useState, useEffect } from 'react'

function reload() {
  const iframe = document.getElementById('spotifyiframe') as HTMLIFrameElement
  iframe.src += ''
  // window.location.reload()
}

interface CountdownTimerProps {
  dayOfWeek: string
  time: string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ dayOfWeek, time }) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const targetDayIndex = daysOfWeek.indexOf(dayOfWeek)

  const _second = 1000
  const _minute = _second * 60
  const _hour = _minute * 60
  const _day = _hour * 24

  const calculateTimeRemaining = () => {
    const now = new Date()

    if (time === '05:00') {
      let targetTime = new Date()
      targetTime.setUTCHours(5, 0, 0, 0)

      if (now.getUTCHours() >= 5) {
        targetTime.setUTCDate(targetTime.getUTCDate() + 1)
      }

      let distance: number = targetTime.getTime() - now.getTime()

      const hours = Math.floor(distance / _hour)
      const minutes = Math.floor((distance % _hour) / _minute)
      const seconds = Math.floor((distance % _minute) / _second)
      // reload()

      return (
        <div>
          <h1 className="pb-2 text-center md:text-start">
            The Playlist will be updated:
          </h1>
          <div className="flex justify-start gap-5 ">
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                0
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                DAYS
              </div>
            </div>
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {hours}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                HOURS
              </div>
            </div>
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {minutes}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                MIN
              </div>
            </div>
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {seconds}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                SEC
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      let targetTime = new Date()
      const timeParts = time.split(':')
      targetTime.setUTCHours(Number(timeParts[0]), Number(timeParts[1]), 0, 0)
      // targetTime.setUTCHours(time.split(':')[0], time.split(':')[1], 0, 0)

      if (now.getUTCDay() === targetDayIndex && now >= targetTime) {
        targetTime.setUTCDate(targetTime.getUTCDate() + 7)
      } else {
        let daysUntilNextTargetDay = (targetDayIndex - now.getUTCDay() + 7) % 7
        if (daysUntilNextTargetDay === 0 && now > targetTime) {
          daysUntilNextTargetDay = 7
        }
        targetTime.setUTCDate(targetTime.getUTCDate() + daysUntilNextTargetDay)
      }

      let distance: number = targetTime.getTime() - now.getTime()

      const days = Math.floor(distance / _day)
      const hours = Math.floor((distance % _day) / _hour)
      const minutes = Math.floor((distance % _hour) / _minute)
      const seconds = Math.floor((distance % _minute) / _second)
      return (
        <div>
          <h1 className="pb-2 text-center md:text-start">
            The Playlist will be updated:
          </h1>
          <div className="flex justify-start gap-5 ">
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {time === '05:00' ? '0' : days}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                DAYS
              </div>
            </div>
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {hours}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                HOURS
              </div>
            </div>
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {minutes}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                MIN
              </div>
            </div>
            <div>
              <div className="w-[50px] h-[50px] bg-[#343650] rounded-lg flex items-center justify-center text-2xl text-white drop-shadow-2xl">
                {seconds}
              </div>
              <div className="mt-2 w-[50px] flex justify-center text-xs font-bold">
                SEC
              </div>
            </div>
          </div>
        </div>
      )
      // return `${days} <p>days</p> ${hours} hrs ${minutes} mins ${seconds} secs`
    }
  }

  const [countdownText, setCountdownText] = useState(calculateTimeRemaining())

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownText(calculateTimeRemaining())
    }, 1000)

    return () => {
      clearInterval(timer)
      reload()
      console.log('reload')
      // setTimeout(() => {
      //   reload()
      // }, 60000)
    }
  }, [dayOfWeek, time])

  return <div id="countdown">{countdownText}</div>
}

export default CountdownTimer
