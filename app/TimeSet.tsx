"use client"
import React, { useEffect, useState } from 'react'

type Props = {}

const TimeSet = (props: Props) => {
    const[timesup, setTimesup] = useState(false);
    const[days, setDays] = useState(0);
    const[minutes, setMinutes] = useState(0);
    const[hours, setHours] = useState(0);
    const[seconds, setSeconds] = useState(0);
    
    useEffect(() => {
      const target  = new Date("08/19/2023 22:22:10")
      const timeup = false;
      const interval = setInterval(()=>{
        
        const now = new Date()
        const difference = target.getTime() - now.getTime()
        const d  = Math.floor(difference/(1000*60*60*24))
        const h = Math.floor((difference%(1000*60*60*24))/(1000*60*60))
        const m = Math.floor((difference%(1000*60*60))/(1000*60))
        const s = Math.floor((difference%(1000*60))/(1000))
        setHours(h)
        setDays(d)
        setMinutes(m)
        setSeconds(s)
        if(d<=0 && h<=0 && m<=0 && s<=0){
          setTimesup(true);
        }
  
      },1000)
      
      
  
      return () => clearInterval(interval);
  }, []);
  
    return (
      <main >
        {timesup?<div>Timesup</div>:(
        <div>
          Days{days}
          Hours{hours}
          Minutes{minutes}
          Seconds{seconds}
        </div>
      
      )}
      </main>
    )
  }

export default TimeSet