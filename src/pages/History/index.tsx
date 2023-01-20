import React, { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns'

export default function History() {
    const {cycles} = useContext(CyclesContext)
    return (
        <HistoryContainer>
            <h1>History</h1>
            <HistoryList>
               <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Started</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle)=>(
                            <tr key={cycle.id}>
                            <td>{cycle.task}</td>
                            <td>{cycle.minutesAmount} min</td>
                            <td>{formatDistanceToNow(cycle.startDate,{addSuffix:true})}</td>
                            <td>
                                {cycle.finishedDate && 
                                    (<Status statusColor="green">Finished</Status>)
                                }
                                {cycle.interruptedDate && 
                                    (<Status statusColor="red">Stopped</Status>)
                                }
                                {(!cycle.interruptedDate && !cycle.finishedDate) && 
                                    (<Status statusColor="yellow">In Progress</Status>)
                                }
                                
                            </td>
                        </tr>
                        ))}

                    </tbody>
                </table> 
            </HistoryList>
        </HistoryContainer>
    )
}