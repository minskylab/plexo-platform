import { TasksQuery } from "integration/graphql";
import { Filter } from "./types";


export const DatabyFilter = (filterList: Filter[], tasksData: TasksQuery) : TasksQuery => {
    let updatedData = {...tasksData!};
    if (filterList.length > 0) {
        let finalData: any[]= [...tasksData.tasks];
        for (let i = 0; i < filterList.length; i++){
        if (filterList[i].name === "status"){
            let statusFilterData: any[]= [];   
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                statusFilterData.push(...finalData.filter((t: { id: any | null, status: string }) => t.status === filterList[i].elements[j].toString()));
            }
            finalData = [...statusFilterData];
        }
        if (filterList[i].name === "assignee"){
            let assigneeFilterData: any[]= [];   
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                assigneeFilterData.push(...finalData.filter((t: { id: any | null, assignees?: any|null }) => t.assignees?.filter((a: { id: any | null; }) => a.id === filterList[i].elements[j].toString()).length > 0));
            }
            finalData = [...assigneeFilterData];
        }
        if (filterList[i].name === "leader"){
            let leaderFilterData: any[]= [];
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                leaderFilterData.push(...finalData.filter((t: { id: any | null, leadId?: any|null }) => t.leadId?.toString() === filterList[i].elements[j].toString()));
            }
            finalData = [...leaderFilterData];
        }
        if (filterList[i].name === "creator"){
            let creatorFilterData: any[]= [];
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                creatorFilterData.push(...finalData.filter((t: { id: any | null, ownerId?: any|null }) => t.ownerId?.toString() === filterList[i].elements[j].toString()));
            }
            finalData = [...creatorFilterData];
        }
        if (filterList[i].name === "priority"){
            let priorityFilterData: any[]= [];
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                priorityFilterData.push(...finalData.filter((t: {id: any | null, priority: string }) => t.priority === filterList[i].elements[j].toString()));
            }
            finalData = [...priorityFilterData];
        }
        if (filterList[i].name === "labels"){
            let labelFilterData: any[]= [];
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                labelFilterData.push(...finalData.filter((t: { id: any | null, labels: Array<string> }) => t.labels.includes(filterList[i].elements[j].toString())));
            }
            finalData = [...labelFilterData];
        }
        if (filterList[i].name === "project"){
            let projectFilterData: any[]= [];
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
                projectFilterData.push(...finalData.filter((t: { id: any | null,projectId?: any|null }) => t.projectId?.toString() === filterList[i].elements[j].toString()));
            }
            finalData = [...projectFilterData];
        }
        }
        updatedData.tasks = finalData;
    }
    return updatedData;
};
