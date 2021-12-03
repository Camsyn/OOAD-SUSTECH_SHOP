import chat from "../../utils/chat";
import {parseTime, sortUp} from "@/utils/date";
import {getLastOfEach} from "@/api/chat";
import da from "element-ui/src/locale/lang/da";

const chatter = {
    state:{
        chat: new chat(),
        messages: null,
        messagesShort: null,
        tracer: 0,
    },

    getters: {
        msgAll: state => {
            let _ = state.tracer;
            return state.messages;
        },

        msgOf: state => sid => {
            let _ = state.tracer;
            return state.messages.get(sid);
        },

        msgEach: state=>{
            let _ = state.tracer;
            return Array.from(state.messagesShort);
        }
    },

    mutations:{
        TRACE(state){
            state.tracer++;
        },
        SET_UP (state, {context, sid}){
            state.chat.setup(context, sid);
            state.tracer++;
        },
        MSG_EACH_SET(state, msg){
            state.messagesShort = msg;
            state.tracer++;
        },
        MSG_SET(state, msg){
            state.messages = msg;
            state.tracer++;
        },

        SORT_UP_MSG(state){
            let tmp = Array.from(state.messages);
            tmp.sort((t1, t2)=>{
                return sortUp(parseTime(t1[0][0]), parseTime(t2[0][0]));
            });
            let mp = new Map(tmp.map((i)=>[i[0], i[1]]));
            state.messages = mp;
            // console.log(state.messages);
            state.tracer++;
        },
        UPDATE_SHORT(state, {msg, id}){
            state.messagesShort.delete(id);
            let tmp = Array.from(state.messagesShort);
            tmp.unshift([id, msg]);
            state.messagesShort = new Map(tmp.map((i)=>[i[0], i[1]]));
        },

        REV_MSG(state, msg){
            let {sendId, sendTime, recvTime, type, content} = msg;
            this.commit("STORE_MSG", {msg, id: sendId});
            this.commit("UPDATE_SHORT", {msg, id: msg.sendId});
            state.tracer++;
        },
        STORE_MSG(state, {msg, id}){
            if (state.messages.has(id))
                state.messages.get(id).push(msg);
            else
                state.messages.set(id, [msg]);
        },
        SEND_MSG(state, msg){
            state.chat.sendTo(msg).then((res)=>{
                console.log(msg);
                this.commit("STORE_MSG", {msg, id: msg.recvId});
                this.commit("UPDATE_SHORT", {msg, id: msg.recvId});
            }).catch((err)=>{
                console.log(err);
            });
            state.tracer++;
        }
    },

    actions: {
        setupChat(context, sid){
            context.commit("SET_UP", {context, sid});
        },
        //取得每个用户发来的最后一条消息, 顺便获取相关用户信息
        renew(context){
            context.commit("TRACE");
            return new Promise((resolve, reject)=>{
                getLastOfEach(context.state.name)
                    .then((res)=>{
                        const data = res.data;
                        let msgAll = new Map();
                        let each = new Map();
                        for (let id in data){
                            // context.dispatch("getInfoOf", id);
                            let records = data[id];
                            if (Array.isArray(records)){
                                each.set(parseInt(id),records[records.length-1]);
                                msgAll.set(parseInt(id), records);
                            }
                        }
                        context.commit("MSG_EACH_SET", each);
                        context.commit("MSG_SET", msgAll);
                    }).catch((err) => {
                        console.log(err);
                });
                resolve();
            })
        },

        send(context, msg){
            return new Promise((resolve, reject)=>{
                context.commit("SEND_MSG", msg);
                resolve();
            })
        },

        test(context){
            context.state.chat.test();
        }
    }
}

export default chatter;
