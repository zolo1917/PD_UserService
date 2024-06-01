import { Firestore } from "firebase-admin/firestore";
import { getFirestoreInstance } from "../config/firebaseConfig";

export function getAllUserDetails () {
    const userRef = 
}
export function getUserDetailsById() {}
export function createUser() {}
export function updateUser () {}
export function deleteUser () {} 

class UserService {
    private firebaseDb: Firestore;
    constructor() {
        this.firebaseDb = getFirestoreInstance()
    }

    public async getAllUserDetails () {
        const userRef = this.firebaseDb.collection("Users")
        await userRef.get().then((resp)=> {
            const data = resp.docs.map((doc)=> doc.data())
        })

    }
    public async getUserDetailsById(id: string) {
        await 
    }
    public createUser(data: any) {}
    public updateUser (id: string, data: any) {}
    public deleteUser (id : string) {}  
}