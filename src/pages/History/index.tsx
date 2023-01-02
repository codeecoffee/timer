import React from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";


export default function History() {
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
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 min</td>
                            <td>2 months ago</td>
                            <td><Status statusColor="green">Finished</Status></td>
                        </tr>
                    </tbody>
                </table> 
            </HistoryList>
        </HistoryContainer>
    )
}