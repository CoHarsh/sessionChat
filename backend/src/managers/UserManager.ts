import { Socket } from "socket.io";
import { FeedManager } from "./SessionManager.js";

const adminPassword = "ADMIN_PASSWORD";

export class UserManager {
    private sessionManager;

    constructor(){
        this.sessionManager = new FeedManager;
    }

    addUser(socket: Socket) {
        this.createHandler(socket);
    }

    private createHandler(socket: Socket) {
        socket.on("join", (data) => {
           const userId = this.sessionManager.addUser(data.sessionId,data.name);
           console.log(userId);
           socket.emit("init",{
            userId: userId
           });
           socket.join(data.sessionId);
        });

        socket.on("joinAdmin",(data)=>{
            if(data.password != adminPassword){
                return;
            }
            console.log("Admin Joined");
            
            socket.on("createSession",(data)=>{
                this.sessionManager.addSession(data.sessionId);
            });

        });

        socket.on("leave",(data)=>{
            const sessionId = data.sessionId;
            const userId = data.userId;
            this.sessionManager.getSession(sessionId).leaveSession(userId);
        })


        
        socket.on("chat",(data)=>{
            const userId = data.userId;
            const sessionId = data.sessionId;
            const content = data.content;
            if(!content || !userId || !sessionId){
                console.log("Issue while receiving chat message!");
                return;
            }
            console.log("Chat message received");
            this.sessionManager.addChat(userId, sessionId, content);
            this.sessionManager.getSession()?.debug();
        })
    }
}
