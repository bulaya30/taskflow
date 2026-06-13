import "dotenv/config";
import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";
import type { Auth } from "firebase-admin/auth";

// ==============================
// ENV VALIDATION
// ==============================
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
} = process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  throw new Error("Missing Firebase environment variables");
}
// ==============================
// FIREBASE INIT
// ==============================
const serviceAccount: ServiceAccount = {
  projectId: FIREBASE_PROJECT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ==============================
// DB INSTANCES
// ==============================
const firestore = admin.firestore();
const auth : Auth = admin.auth();

// ==============================
// TYPES
// ==============================
type FirestoreData = Record<string, any>;

type GetOptions = {
  orderByField?: string;
  orderDirection?: "asc" | "desc";
};

// ==============================
// HELPERS
// ==============================
function cleanUndefined<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as T;
}

// ==============================
// CRUD OPERATIONS
// ==============================
const add = async (
  collection: string,
  data: FirestoreData,
  docId: string | null = null
) => {
  const payload = {
    ...cleanUndefined(data),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const col = firestore.collection(collection);

  if (docId) {
    await col.doc(docId).set(payload);
    return { id: docId, ...payload };
  }

  const docRef = await col.add(payload);
  return { id: docRef.id, ...payload };
};

const get = async (
  collection: string,
  field: string | null = null,
  value: any = null,
  options: GetOptions = {}
) => {
  const {
    orderByField = "createdAt",
    orderDirection = "desc",
  } = options;

  const col = firestore.collection(collection);

  // GET BY ID
  if (field === "id" && value) {
    const doc = await col.doc(value).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  let query: FirebaseFirestore.Query = col;

  // FILTER
  if (field && value !== undefined && value !== null) {
    query = query.where(field, "==", value);
  }

  // ORDER
  if (!field) {
    query = query.orderBy(orderByField, orderDirection);
  }

  const snapshot = await query.get();

  if (snapshot.empty) {
    return field ? null : [];
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const update = async (
  collection: string,
  id: string,
  data: FirestoreData
) => {
  await firestore.collection(collection).doc(id).update({
    ...cleanUndefined(data),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return true;
};

const remove = async (collection: string, id: string) => {
  await firestore.collection(collection).doc(id).delete();
  return true;
};

const exists = async (
  collection: string,
  field: string,
  value: any
) => {
  if (field === "id") {
    const doc = await firestore.collection(collection).doc(value).get();
    return doc.exists;
  }

  const snap = await firestore
    .collection(collection)
    .where(field, "==", value)
    .limit(1)
    .get();

  return !snap.empty;
};

// ==============================
// EXPORTS
// ==============================
export default {
  add,
  get,
  update,
  remove,
  exists,
};

export { auth, firestore };