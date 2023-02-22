import { TasksDocument, TasksQuery } from "integration/graphql";
import { useQuery } from "urql";
import { Filter } from "./types";


export const DatabyFilter = (filterList: Filter[], tasksData: TasksQuery) : TasksQuery => {
    let updatedData = {...tasksData!};
    const addedElements = new Map();
    if (filterList.length > 0) {
        let finalData: any[]= [];
        for (let i = 0; i < filterList.length; i++){
        if (filterList[i].name === "status"){
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
            finalData.push(...updatedData.tasks.filter((t: { id: any | null, status: string }) => {
                if (!addedElements.has(t.id) && t.status === filterList[i].elements[j].toString()){
                addedElements.set(t.id, true);
                return true;
                }
                return false;
            }));
            }
        }
        if (filterList[i].name === "assignee"){
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
            finalData.push(...updatedData.tasks.filter((t: { id: any | null, leadId?: any|null }) => {
                if (!addedElements.has(t.id) && t.leadId?.toString() === filterList[i].elements[j].toString()){
                addedElements.set(t.id, true);
                return true;
                }
                return false;
            }));
            }
        }
        if (filterList[i].name === "creator"){
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
            finalData.push(...updatedData.tasks.filter((t: { id: any | null, ownerId?: any|null }) => {
                if (!addedElements.has(t.id) && t.ownerId?.toString() === filterList[i].elements[j].toString()){
                addedElements.set(t.id, true);
                return true;
                }
                return false;
            }));
            }
        }
        if (filterList[i].name === "priority"){
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
            finalData.push(...updatedData.tasks.filter((t: {id: any | null, priority: string }) => {
                if (!addedElements.has(t.id) && t.priority === filterList[i].elements[j].toString()){
                addedElements.set(t.id, true);
                return true;
                }
                return false;
            }));
            }
        }
        if (filterList[i].name === "labels"){
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
            finalData.push(...updatedData.tasks.filter((t: { id: any | null, labels: Array<string> }) => {
                if (!addedElements.has(t.id) && t.labels.includes(filterList[i].elements[j].toString())){
                addedElements.set(t.id, true);
                return true;
                }
                return false;
            }));
            }
        }
        if (filterList[i].name === "project"){
            for (let j = 0 ; j < filterList[i].elements.length; j++) {
            finalData.push(...updatedData.tasks.filter((t: { id: any | null,projectId?: any|null }) => {
                if (!addedElements.has(t.id) && t.projectId?.toString() === filterList[i].elements[j].toString()){
                addedElements.set(t.id, true);
                return true;
                }
                return false;
            }));
            }
        }
        }
        updatedData.tasks = finalData;
    }
    return updatedData;
};
