import { ActionTypes } from "./action";
import {produce} from 'immer'
export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date; 
    finishedDate?: Date;
}
export interface CyclesState{
    cycles: Cycle[]
    activeCycleId: string | null
}




export function cyclesReducer(state: CyclesState, action:any){

    switch(action.type){
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, draft=>{
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })

        case ActionTypes.STOP_CURR_CYCLE:
            return produce(state, draft=>{
                const currCycleIndex = state.cycles.findIndex(cycle=> cycle.id === state.activeCycleId)
                if(currCycleIndex < 0) return state;

                draft.cycles[currCycleIndex].interruptedDate = new Date()
                draft.activeCycleId = null
            })

        case ActionTypes.MARK_CURR_CYCLE_AS_FINISHED:
            return produce(state, draft=>{
                const currCycleIndex = state.cycles.findIndex(cycle=> cycle.id === state.activeCycleId)
                if(currCycleIndex < 0) return state;

                draft.cycles[currCycleIndex].finishedDate = new Date()
                draft.activeCycleId = null
            })
            
        default:
            return state;
    }

}