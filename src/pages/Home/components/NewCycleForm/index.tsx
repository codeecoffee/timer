import { 
    FormContainer, 
    MinutesAmountInput, 
    TaskInput 
} from "./styles";
import { useContext } from 'react';
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";


export function NewCycleForm () {
    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()
    
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
