import { Cycle } from "./reducer";

export enum ActionTypes{
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    STOP_CURR_CYCLE = 'STOP_CURR_CYCLE',
    MARK_CURR_CYCLE_AS_FINISHED = 'MARK_CURR_CYCLE_AS_FINISHED'
}

export function addNewCycleAction(newCycle: Cycle){
    return{
        type: ActionTypes.ADD_NEW_CYCLE,
        payload:{
            newCycle
        }
    }
}
export function StopCurrCycleAction(activeCycleId:string){
    return{
        type: ActionTypes.STOP_CURR_CYCLE
    }
}
export function markCurrCycleAsFinishedAction(){
    return{
        type: ActionTypes.MARK_CURR_CYCLE_AS_FINISHED
    }
}