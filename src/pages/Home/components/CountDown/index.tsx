import { useState, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";


interface CountDownProps {
    activeCycle: any;
    setCycles: any;
    activeCycleId: string;
}
export function CountDown ({ activeCycle, setCycles, activeCycleId }:CountDownProps) {
    const [secondsAmountPassed, setSecondsAmountPassed] = useState<number>(0)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60: 0;

    useEffect(()=>{
        let interval: number;
        if(activeCycle){
            interval= setInterval(()=>{
               const secondsDiff = differenceInSeconds(
                new Date(),
                activeCycle.startDate
                )

                if(secondsDiff >= totalSeconds){

                    setCycles((state)=> 
                        state.map(cycle=>{
                            if(cycle.id === activeCycleId) return {...cycle, finishedDate: new Date ()}
                            else return cycle
                        })  
                    )
                    setSecondsAmountPassed(totalSeconds)
                    clearInterval(interval)
                }
                else setSecondsAmountPassed(secondsDiff)

            },1000)
        }
        return ()=>{
            clearInterval(interval)
        }
    },[activeCycle, totalSeconds, activeCycleId])

    return(
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}