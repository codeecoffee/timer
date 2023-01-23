import { ReactNode, createContext, useReducer, useState } from "react";

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

interface CyclesState{
    cycles: Cycle[]
    activeCycleId: string | null
}

interface CyclesContextPoviderProps{
    children: ReactNode
}

export const CyclesContext= createContext({} as CyclesContextType)

export function CyclesContextProvider ({children}:CyclesContextPoviderProps){
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action:any)=>{

        switch(action.type){
            case 'ADD_NEW_CYCLE':
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                }
            case 'STOP_CURR_CYCLE':
                return{
                    ...state,
                    cycles: state.cycles.map((cycle)=>{
                        if(cycle.id=== state.activeCycleId){
                            return {...cycle, interruptedDate: new Date()}
                        }
                        else{
                            return cycle
                        }
                    }),
                    activeCycleId: null
                }

            case 'MARK_CURR_CYCLE_AS_FINISHED':
                return{
                    ...state,
                    cycles: state.cycles.map((cycle)=>{
                        if(cycle.id === state.activeCycleId){
                            return {...cycle, finishedDate : new Date()}
                        }
                        else{
                            return cycle
                        }
                    })
                }
            default:
                return state;
        }

    },{
        cycles:[],
        activeCycleId: null
    })

    
    const [secondsAmountPassed, setSecondsAmountPassed] = useState<number>(0)
    const {activeCycleId, cycles} = cyclesState

    const activeCycle:Cycle | undefined = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished(){
        // setCycles((state)=>
        //     state.map((cycle)=>{
        //         if(cycle.id === activeCycleId){
        //             return{...cycle, finishedDate: new Date()}
        //         }
        //         else return cycle

        //     })
        // )
        dispatch({
            type:'MARK_CURR_CYCLE_AS_FINISHED',
            payload:{
                activeCycleId
            }
        })
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
        // setCycles((state)=>[...state, newCycle])
        dispatch({
            type:'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })
        setSecondsAmountPassed(0)
        
    }

    function stopCurrentCycle(){
        // setCycles((state) =>
        //     state.map(cycle=>{
        //     if(cycle.id === activeCycleId) return {...cycle, interruptedDate: new Date ()}
        //     else return cycle
        // }))
        dispatch({
            type:'STOP_CURR_CYCLE',
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