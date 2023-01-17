import React, { createContext, useEffect, useState } from "react";
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
interface CyclesContextType{
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: ()=> void
}

export const CyclesContext = createContext({} as CyclesContextType)

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
   
    function markCurrentCycleAsFinished(){
        setCycles((state)=>
            state.map((cycle)=>{
                if(cycle.id === activeCycleId){
                    return{...cycle, finishedDate: new Date()}
                }
                else return cycle

            })
        )
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
                    <NewCycleForm/>
                    <CountDown/>    
                </CyclesContext.Provider>
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