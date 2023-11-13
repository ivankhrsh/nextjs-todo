// 'use server'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "./firebaseClient";
import { revalidatePath } from "next/cache";
import { UpdateTodo } from "../types/updateTodo.type";
// import { initAdmin } from "./firebaseAdmin";
// import { getFirestore } from "firebase-admin/firestore";

// export const getTodosAdminSDK = async () => {
//   await initAdmin();
//   const firestore = getFirestore();
//   const todosQuery = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
//   const todosSnapshot = await getDocs(todosQuery);
//   const documents = todosSnapshot.docs.map((todo) => {
//   return {
//     title: todo.data().title,
//     description: todo.data().description,
//     completed: todo.data().completed,
//     createdAt:  todo.data().createdAt.toString(),
//     id: todo.id,
//   }});
 
//   return documents;
// };


export const deleteTodo = async (todoId: string) => {
  await deleteDoc(doc(db, 'todos', todoId));
  revalidatePath(`${process.env.PROJECT_URL}`)
};

export const handleAddTodo = async (title: string, description: string) => {
  const currentTimestamp = Timestamp.now();
  await addDoc(collection(db, 'todos'), {
    title,
    description,
    completed: false,
    creationTime: currentTimestamp,
  });
  revalidatePath(`${process.env.PROJECT_URL}`)
};

export const handleUpdateTodo = async (payload: UpdateTodo) => {
  const {id, ...data} = payload;
  await updateDoc(doc(db, 'todos', id), {
    ...data
  });
  revalidatePath(`${process.env.PROJECT_URL}`)
};
 