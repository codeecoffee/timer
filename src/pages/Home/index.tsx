import React, { useContext } from "react";
import {HandPalm, Play} from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { CyclesContext } from "../../contexts/CyclesContext";


export default function Home() {
    const {activeCycle,createNewCycle, stopCurrentCycle} = useContext(CyclesContext)

    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1,'Name your task'),
        minutesAmount: zod.number().min(5).max(60, 'The cycle is limited to 60 mins max.')
    })
    
    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }

    const {handleSubmit, watch, reset} = newCycleForm;
    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <CountDown/>             
                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={stopCurrentCycle}>
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