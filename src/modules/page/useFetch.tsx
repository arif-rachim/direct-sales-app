import {useMemo} from "react";

async function uid(val: number) {
    return Math.round(Math.random() * 10000000).toString();
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
            const id = await uid(18);
            const collection = entities[entityName];
            const newCollection = [{id, createdOn: new Date(), lastModifiedOn: undefined, ...value}, ...collection]
            entities[entityName] = newCollection;
            localStorage.setItem(entityName, JSON.stringify(newCollection));
        }

        async function read(id: string) {
            return entities[entityName].find((i: Entity) => i.id === id);
        }

        async function update(value: any) {
            const persisted = read(value.id);
            const collection = entities[entityName];
            const indexToRemove = collection.indexOf(persisted);
            collection.splice(indexToRemove, 1, {...persisted, ...value, lastModifiedOn: new Date()});
            const newCollection = [...collection]
            entities[entityName] = newCollection;
            localStorage.setItem(entityName, JSON.stringify(newCollection));
        }

        async function remove(id: string) {
            const persisted = read(id);
            const collection = entities[entityName];
            const indexToRemove = collection.indexOf(persisted);
            collection.splice(indexToRemove, 1);
            const newCollection = [...collection]
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
            findAll
        }
    }, []);
}