import React, { useEffect, useState } from "react";
import {HandPalm, Play} from 'phosphor-react';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {differenceInSeconds} from 'date-fns'
import { 
    CountDownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownButton, 
    StopCountdownButton, 
    TaskInput 
} from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'Name your task'),
    minutesAmount: zod.number().min(5).max(60, 'The cycle is limited to 60 mins max.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; 
}

export default function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [secondsAmountPassed, setSecondsAmountPassed] = useState<number>(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });
    const activeCycle:Cycle | undefined = cycles.find(cycle => cycle.id === activeCycleId)

    useEffect(()=>{
        let interval: number;
        if(activeCycle){
           interval= setInterval(()=>{
                setSecondsAmountPassed(differenceInSeconds(new Date(),activeCycle.startDate))
            },1000)
        }
        return ()=>{
            clearInterval(interval)
        }
    },[activeCycle])

   

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
        setCycles(cycles.map(cycle=>{
            if(cycle.id === activeCycleId) return {...cycle, interruptedDate: new Date ()}
            else return cycle
        }))
        setActiveCycleId(null)
    }
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
    

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Working on</label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        placeholder="Name your projects" 
                        list="task-suggestions"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />
                    <datalist id="task-suggestions">
                        <option value="Project 1 "/>
                        <option value="Project 2 "/>
                        <option value="Project 3 "/>
                        <option value="Project 4 "/>
                    </datalist>

                    <label htmlFor="">during</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesDuration" 
                        placeholder="00" 
                        step={5}
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount',{valueAsNumber: true})}
                    />

                    <span>minutes.</span>
                
                </FormContainer>
                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>
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