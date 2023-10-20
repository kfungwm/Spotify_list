'use client'

import React, { useState } from 'react'
import Countdown from '../components/Countdown'

const fullDate = new Date().toUTCString().slice(5, 16)

const Spotlist = () => {
  const [selectedType, setSelectedType] = useState<string>('Daily')
  const [listUrl, setListUrl] = useState('3aFzuQjKpISsb67VcoQPWH')
  const [activeGenres, setActiveGenres] = useState('Cantonese')
  const [countDownDate, setCountDownDate] = useState('')
  const [countDownTime, setCountDownTime] = useState('05:00')

  const handleTypeClick = (title: string) => {
    console.log(title)
    setSelectedType(title)
  }

  const selectedGengre = (
    name: string,
    url: string,
    targetDayOfWeek: string,
    targetTime: string
  ) => {
    setActiveGenres(name)
    setListUrl(url)
    setCountDownDate(targetDayOfWeek)
    setCountDownTime(targetTime)
  }
  const dataList = [
    {
      id: 0,
      title: 'Daily',
      options: [
        {
          name: 'Cantonese',
          url: '3aFzuQjKpISsb67VcoQPWH',
          targetDayOfWeek: '',
          targetTime: '05:00',
        },
      ],
    },
    {
      id: 1,
      title: 'Weekly',
      options: [
        {
          name: 'Cantonese 🇭🇰',
          url: '0SjVgjqoZ1PzXV3CD85t19',
          targetDayOfWeek: 'Friday',
          targetTime: '22:30',
        },
        {
          name: 'Mandarin 🇨🇳🇹🇼',
          url: '5Ki1n2OVPooQLtdaiFM4jk',
          targetDayOfWeek: 'Friday',
          targetTime: '23:00',
        },
        {
          name: 'Korean 🇰🇷',
          url: '73WPwUWw792tTnEFt6IXAq',
          targetDayOfWeek: 'Friday',
          targetTime: '23:30',
        },
        {
          name: 'Japanese 🇯🇵',
          url: '5dMtgDuXaI3qy4hLjX59t6',
          targetDayOfWeek: 'Saturday',
          targetTime: '00:00',
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto">
      <div className="w-full flex justify-center">
        {' '}
        <div className="pb-8 text-3xl">Spotify Playlists {fullDate}</div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5 ">
        <div className="w-full md:w-[350px] md:px-5">
          <div className="border border-sky-500 rounded-xl md:min-h-[300px] shadow-md p-5">
            <div className="">
              <h1 className="pb-2">Type</h1>
              <div className="flex flex-wrap gap-2">
                {dataList.map((a, index) => (
                  <button
                    key={index}
                    onClick={() => handleTypeClick(a.title)}
                    className={`border w-[130px] px-4 py-2 text-sm rounded-md  hover:bg-sky-600   ${
                      a.title === selectedType ? 'bg-sky-700' : ''
                    }`}
                  >
                    {a.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h1 className="pb-2 pt-4">Genre</h1>
              <div>
                {dataList.map((a, index) => (
                  <div key={index} className="flex flex-wrap gap-2">
                    {' '}
                    {selectedType === a.title &&
                      a.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() =>
                            selectedGengre(
                              option.name,
                              option.url,
                              option.targetDayOfWeek,
                              option.targetTime
                            )
                          }
                          className={`border w-[130px] px-4 py-2 text-sm rounded-md  hover:bg-sky-600   ${
                            option.name === activeGenres ? 'bg-sky-700' : ''
                          }`}
                        >
                          {option.name}
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>{' '}
          </div>{' '}
          <div className="border border-sky-500 rounded-xl md:min-h-[275px] shadow-md p-5 mt-[24px]">
            <div className="flex justify-center ">
              <div className="flex flex-col items-center">
                <Countdown dayOfWeek={countDownDate} time={countDownTime} />
                <button className="mt-8 border w-[150px] px-4 py-2 text-sm rounded-md bg-[#2c958c]">
                  {' '}
                  <a
                    href={`https://open.spotify.com/playlist/${listUrl}`}
                    target="_blank"
                  >
                    Add Playlist
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[500px]">
          <iframe
            id="spotifyiframe"
            src={`https://open.spotify.com/embed/playlist/${listUrl}?utm_source=generator&theme=1`}
            width="100%"
            height="600px"
            frameBorder="0"
            // allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Spotlist
