import { IoManager } from "./managers/IoManager.js";

interface User{
    name: string;
    userId: string;
}

interface Chat{
    content: string;
    user: User;
} 

export class Session{
    private sessionId: string;
    private users: User[];
    private chats: Chat[];

    constructor(sessionId: string){
        this.sessionId = sessionId;
        this.users = [];
        this.chats = [];
    }


    addUser(name: string){
        var userId = this.genRandonString(7);
        this.users.push({
            name,
            userId
        });
        return userId;
    }

    debug(){
        console.log("DEBUGGING.......");
        console.log(this.sessionId);
        console.log(JSON.stringify(this.chats));
        console.log(JSON.stringify(this.users));
        
    }

    leaveSession(userId: string){
        try{
            this.users.filter(user=> user.userId !== userId);
            return 1;
        }catch{
            return 0;
        }
    }


    addChat(userId: string, chatData: string):Number{
        const user = this.users.find(user => user.userId === userId);
        if(!user){
            console.log("User not found!");
            return 0;
        }

        this.chats.push({
            content: chatData,
            user,
        });
        IoManager.getIo().to(this.sessionId).emit("chat",{
            username:user.name,
            content: chatData
        });
        this.debug();
        return 1;
    }

    genRandonString(length: number) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < length; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
     }
}