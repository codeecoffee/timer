import { useState, useEffect, useContext } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";



export function CountDown () {
    const {
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        secondsAmountPassed,
        proxySetSecondsPassed
    } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60: 0;

    const currentSecondsAmount = activeCycle ? totalSeconds - secondsAmountPassed : 0;
    const minutesAmount = Math.floor(currentSecondsAmount / 60);
    const secondsAmount = currentSecondsAmount %60;

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(()=>{
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    },[minutes,seconds, activeCycle])
    useEffect(()=>{
        let interval: number;
        if(activeCycle){
            interval= setInterval(()=>{
               const secondsDiff = differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
                )

                if(secondsDiff >= totalSeconds){
                    markCurrentCycleAsFinished()
                    proxySetSecondsPassed(totalSeconds)
                    clearInterval(interval)
                }
                else proxySetSecondsPassed(secondsDiff)

            },1000)
        }
        return ()=>{
            clearInterval(interval)
        }
    },[activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, proxySetSecondsPassed])

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