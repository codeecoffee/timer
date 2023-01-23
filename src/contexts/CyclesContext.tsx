import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction, markCurrCycleAsFinishedAction } from "../reducers/cycles/action";


interface CreateCycleData{
    task: string
    minutesAmount: number
}
 
interface CyclesContextType{
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    secondsAmountPassed: number
    markCurrentCycleAsFinished: ()=> void
    proxySetSecondsPassed: (seconds: number)=> void
    stopCurrentCycle: () => void
    createNewCycle: (data: CreateCycleData) => void
}

interface CyclesContextPoviderProps{
    children: ReactNode
}

export const CyclesContext= createContext({} as CyclesContextType)

export function CyclesContextProvider ({children}:CyclesContextPoviderProps){
    const [cyclesState, dispatch] = useReducer(cyclesReducer,{
        cycles:[],
        activeCycleId: null
    })

    
    const [secondsAmountPassed, setSecondsAmountPassed] = useState<number>(0)
    const {activeCycleId, cycles} = cyclesState

    const activeCycle:Cycle | undefined = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished(){
        dispatch(markCurrCycleAsFinishedAction())
    }

    function proxySetSecondsPassed(seconds: number){
        setSecondsAmountPassed(seconds)
    }

    function createNewCycle(data:CreateCycleData){
        const id = String(new Date().getTime());
        const newCycle:Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        dispatch(addNewCycleAction(newCycle))
        setSecondsAmountPassed(0)
        
    }

    function stopCurrentCycle(){

        dispatch({
            type:ActionTypes.STOP_CURR_CYCLE,
            payload:{
                activeCycleId 
            }
        })
    }

    return(
        <CyclesContext.Provider value={
            {
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                proxySetSecondsPassed,
                secondsAmountPassed,
                createNewCycle,
                stopCurrentCycle
            }
        }>
            { children }
        </CyclesContext.Provider>
    )

}