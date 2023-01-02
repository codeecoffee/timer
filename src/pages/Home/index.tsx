import React from "react";
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

export default function Home() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data:any){
        reset();
    }
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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Start
                </StartCountdownButton>

            </form>
        </HomeContainer>
    )
}