import { ReactNode, createContext, useState } from "react";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; 
    finishedDate?: Date;
}

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
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [secondsAmountPassed, setSecondsAmountPassed] = useState<number>(0)

    const activeCycle:Cycle | undefined = cycles.find(cycle => cycle.id === activeCycleId)

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
        setCycles((state)=>[...state, newCycle])
        setActiveCycleId(id);
        setSecondsAmountPassed(0)
        
    }

    function stopCurrentCycle(){
        setCycles((state) =>
            state.map(cycle=>{
            if(cycle.id === activeCycleId) return {...cycle, interruptedDate: new Date ()}
            else return cycle
        }))
        setActiveCycleId(null)
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