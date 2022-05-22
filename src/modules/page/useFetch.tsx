import {useMemo} from "react";

function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const entities: any = {};

interface Entity {
    id: string;
    createdBy: string;
    createdOn: Date;
    lastModifiedBy: string;
    lastModifiedOn: Date;
}

export function useFetch(entityName: string) {
    return useMemo(() => {

        if (!(entityName in entities)) {
            const entityString = localStorage.getItem(entityName) || '[]';
            entities[entityName] = JSON.parse(entityString) || [];
        }

        async function create(value: any) {
            const id = generateUUID();
            const collection = entities[entityName];
            const newCollection = [{id, createdOn: new Date(), lastModifiedOn: undefined, ...value}, ...collection]
            entities[entityName] = newCollection;
            localStorage.setItem(entityName, JSON.stringify(newCollection));
        }

        async function read(id: string) {
            const entity = entities[entityName].find((i: Entity) => i.id === id);
            return ({...entity});
        }

        async function update(value: any) {
            const persisted = entities[entityName].find((i: Entity) => i.id === value.id);
            const collection = entities[entityName];
            const indexToRemove = collection.indexOf(persisted);
            collection.splice(indexToRemove, 1, {...persisted, ...value, lastModifiedOn: new Date()});
            const newCollection = [...collection]
            entities[entityName] = newCollection;
            localStorage.setItem(entityName, JSON.stringify(newCollection));
        }

        async function remove(id: string) {
            const collection = entities[entityName];
            const newCollection = collection.filter((i:any) => i.id !== id);
            entities[entityName] = newCollection;
            localStorage.setItem(entityName, JSON.stringify(newCollection));
        }

        async function removeAll(ids:Array<string>){
            const collection = entities[entityName];
            const newCollection = collection.filter((i:any) => !ids.includes(i.id));
            entities[entityName] = newCollection;
            localStorage.setItem(entityName, JSON.stringify(newCollection));
        }

        async function findAll() {
            return entities[entityName];
        }

        return {
            create,
            read,
            update,
            remove,
            findAll,
            removeAll
        }
    }, []);
}