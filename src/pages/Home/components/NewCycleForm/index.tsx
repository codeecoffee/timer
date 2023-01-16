import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { 
    FormContainer, 
    MinutesAmountInput, 
    TaskInput 
} from "./styles";

export function NewCycleForm () {
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1,'Name your task'),
        minutesAmount: zod.number().min(5).max(60, 'The cycle is limited to 60 mins max.')
    })
    
    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    return (
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
    ) 
}
