import { getByTitle } from '@testing-library/react';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    getDocs,
    setDoc,
    getDoc,
    deleteDoc
} from 'firebase/firestore';
import FirestoreDb from '../firebaseConfig';




export const newItem = async (data) => {
    const newDoc = doc(
        FirestoreDb,
        `lastOrderId/lastOrderId`
    )
     const newQ = query(
        newDoc
    );

    const querySnapshot = await getDoc(newQ);
    const lastOrderId = querySnapshot?.data()?.id;
    data.orderId = lastOrderId + 1;
    if(lastOrderId) {
        addItem('dish', data);
        addItem('station', data);
        addItem('action', data);
        setOrder(data);

        await setDoc(newDoc, {id: data.orderId});
    }



    
}

const setOrder = async(data) => {
    const newDoc = doc(
        FirestoreDb,
        `orders/${data.orderId}`
    )
    console.log(data);

    await setDoc(newDoc, data);

}

export const addItem = async (type, data) => {
     const newDoc = doc(
        FirestoreDb,
        `${type}/${data[type]}`
    )
     const newQ = query(
        newDoc
    );
    
    const querySnapshot = await getDoc(newQ);
    let actionData = querySnapshot.data();
    if(!actionData) {
        //addItem to items
        const newDocument = doc(
            FirestoreDb,
            `${type}/allItems`
        )

        const newQuery = query(
            newDocument
        );
        let allItemsSnap = await getDoc(newQuery);
        let allItems = allItemsSnap.data();
        

        if(allItems)
        allItems.items.push(data[type]);
        else allItems = {items : [data[type]]};

        await setDoc(newDocument, allItems);
        
        actionData = {
            time: 0,
            count: 0,
            orderId: {}
        }
    }

    actionData.time += data.time;
    actionData.count += 1;
    actionData.orderId[data.orderId] = data.time;
    await setDoc(newDoc, actionData);
}

export const getItemNames = async (type) => {
    const newDocument = doc(
        FirestoreDb,
        `${type}/allItems`
    )

    const newQuery = query(
        newDocument
    );
    let allItemsSnap = await getDoc(newQuery);

    return allItemsSnap.data();
}

