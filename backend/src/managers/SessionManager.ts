import { IoManager } from "./IoManager.js";
import { Session } from "../Session.js";

export class FeedManager{
    private sessions;

    constructor(){
        this.sessions = [];
    }

    public start(sessionId: string){
        const session = this.getSession(sessionId);
        if(!session){
            const newSession = new Session(sessionId);
            return newSession;
        }else{
            return session;
        }
    }

    addSession(sessionId:string){
        if(this.getSession(sessionId)){return;}
        const session = new Session(sessionId);
        this.sessions.push(session);
        console.log(JSON.stringify(session));
    }

    addChat(userId:string,sessionId:string,content:string){
        const response = this.getSession(sessionId)?.addChat(userId,content);
        if(response === 1){
            console.log("Chat added successfully!");
        }else{
            console.log("Chat added failed!");
        }
    }
    
    addUser(sessionId:string, name:string){
        return this.getSession(sessionId)?.addUser(name);
    }

    getSession(sessionId:string){
        return this.sessions.find(session => session.sessionId === sessionId);
    }
}