import React, { useState } from "react";
import {Play} from 'phosphor-react';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { 
    CountDownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownButton, 
    TaskInput 
} from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1,'Name your task'),
    minutesAmount: zod.number().min(5).max(60, 'The cycle is limited to 60 mins max.')
})

// interface NewCycleFormData {
//     task: string
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
}

const [cycles, setCycles] = useState<Cycle[]>([])
const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
const [secondsAmountPassed, setSecondsAmountPassed] = useState<number>(0)
export default function Home() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data:NewCycleFormData){
        const id = String(new Date().getTime());
        const newCycle:Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount
        }
        setCycles((state)=>[...state, newCycle])
        setActiveCycleId(id);
        reset();
    }

    const activeCycle:Cycle | undefined = cycles.find(cycle => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60: 0;
    const currentSecondsAmount = activeCycle ? totalSeconds - secondsAmountPassed : 0;
    const minutesAmount = Math.floor(currentSecondsAmount / 60);
    const secondsAmount = currentSecondsAmount %60;

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')
    

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

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Start
                </StartCountdownButton>

            </form>
        </HomeContainer>
    )
}