import { defineStore } from "pinia";
import { generateUUID } from "@/utils";
import { getFiles, delFilesById } from "@/api";

export const useChatStore = defineStore({
  id: "chat",
  state: () => {
    return {
      loading: false,
      chatId: "", // 当前 chatId
      chatList: [], // 当前文件
      messageList: [], // 当前聊天信息
      file: {}, // 当前文件
      chatInfo: {}, // 当前聊天信息
      sendOptions: {}, // 发送的配置信息
      tabIndex: '1', // 1 闲聊 2 文件问答
      folderList: [],
    };
  },
  getters: {
    chat: (state) => {
      let t = {};
      if (state.tabIndex == 1) {
        t = state.chatInfo;
      }
      if (state.tabIndex == 2) {
        t = state.file;
      }
      return t;
    },
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    // chat 相关
    initChat() {
      const chatListJson = localStorage.getItem("chatbot-chat-list") || "[]";
      const list = JSON.parse(chatListJson);
      this.chatList = list;
      if (this.chatList.length == 0) this.createChat();
      this.setChat(this.chatList[0]);
    },
    createChat() {
      const item = {
        id: generateUUID(),
        name: "智能助手",
        headImg: "",
        lastMsg: "",
        updateTime: "",
      };
      this.chatList.push(item);
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList));
    },
    updateChatItem(data) {
      const t = this.chatList.find((item) => item.id === this.chat.id);
      if (t) {
        for (const key in data) {
          t[key] = data[key];
        }
        this.setChat(t);
      }
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList));
    },
    delChat(id) {
      this.chatList = this.chatList.filter((item) => item.id !== id);
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList));
      $message.success("操作成功")
    },
    initMessage(id) {
      this.chatId = id;
      const messageMapJson =
        localStorage.getItem("chatbot-chat-message-map") || "{}";
      const map = JSON.parse(messageMapJson);
      this.messageList = map[id]?.filter((t) => t.content) || [];
    },
    addMessage(val) {
      this.messageList.push(
        {
          content: val,
          role: "user",
          status: "success",
          datetime: "",
        },
        {
          content: "",
          role: "system",
          status: "loading",
        }
      );
    },
    // 更新最后一条回复的状态、信息
    updateItem(content, status) {
      if (status) this.messageList[this.messageList.length - 1].status = status;
      if (content)
        this.messageList[this.messageList.length - 1].content = content;
      const messageMapJson =
        localStorage.getItem("chatbot-chat-message-map") || "{}";
      const map = JSON.parse(messageMapJson);
      map[this.chatId] = this.messageList;
      localStorage.setItem("chatbot-chat-message-map", JSON.stringify(map));
    },
    // 文件相关
    setSendOptions(data) {
      this.sendOptions = data;
    },
    setTabIndex(index) {
      if (index !== undefined) this.tabIndex = index;
    },
    async initFiles() {
      this.loading = true;
      this.folderList = await getFiles().finally(() => (this.loading = false));
      this.setFile(this.folderList[0]);
    },
    setFile(data) {
      this.file = convertChat(data) || {};
      function convertChat(data = {}) {
        return {
          ...data,
          title: data.filename,
          desc: data.desc || "暂无备注",
          avatar:
            data.headImg ||
            "https://lf3-static.bytednsdoc.com/obj/eden-cn/zu-qz/ljhwZthlaukjlkulzlp/CNS-新封面图片/PPT生成.jpg",
        };
      }
    },
    setChat(data) {
      this.chatInfo = convertChat(data) || {};
      function convertChat(data = {}) {
        return {
          ...data,
          title: data.name,
          desc: data.desc || "暂无备注",
          avatar:
            data.headImg ||
            "https://lf3-static.bytednsdoc.com/obj/eden-cn/zu-qz/ljhwZthlaukjlkulzlp/CNS-新封面图片/PPT生成.jpg",
        };
      }
    },
  },
});
