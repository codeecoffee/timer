import React, { useEffect, useState } from "react";
import {HandPalm, Play} from 'phosphor-react';

import {differenceInSeconds} from 'date-fns'
import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";



interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; 
    finishedDate?: Date;
}

export default function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


    const activeCycle:Cycle | undefined = cycles.find(cycle => cycle.id === activeCycleId)



   

    function handleCreateNewCycle(data:NewCycleFormData){
        const id = String(new Date().getTime());
        const newCycle:Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        setCycles((state)=>[...state, newCycle])
        setActiveCycleId(id);
        setSecondsAmountPassed(0)
        reset();
    }

    function handleStopCycle(){
        setCycles((state) =>
            state.map(cycle=>{
            if(cycle.id === activeCycleId) return {...cycle, interruptedDate: new Date ()}
            else return cycle
        }))
        setActiveCycleId(null)
    }
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
    

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <NewCycleForm/>
                <CountDown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/>    
            
                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={handleStopCycle}>
                        <HandPalm size={24}/>
                        Stop
                    </StopCountdownButton>
                ):(
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Start
                    </StartCountdownButton>
                )}
  

            </form>
        </HomeContainer>
    )
}