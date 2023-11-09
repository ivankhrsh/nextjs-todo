import "server-only";
import { getFirestore } from "firebase-admin/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseClient";

export const getTodos = async () => {
  'use server'
  const firestore = getFirestore();
  const todosQuery = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
  const todosSnapshot = await getDocs(todosQuery);
  const documents = todosSnapshot.docs.map((todo) => {
    const timestamp = todo.data().createdAt.toDate();
    const formattedDate = timestamp.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

      return {
      title: todo.data().title,
      description: todo.data().description,
      completed: todo.data().completed,
      createdAt: formattedDate,
      id: todo.id
  }});
 
  return documents;
};
 