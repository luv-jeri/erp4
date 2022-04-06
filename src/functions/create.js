import firebase from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const { db } = firebase;

export default async function create(...args) {
  const [collection, data] = args;

  try {
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const docRef = doc(db, collection, id);

    const userDoc = await setDoc(docRef, { ...data, id });

    return userDoc;
  } catch (error) {
    throw error.message;
  }
}
