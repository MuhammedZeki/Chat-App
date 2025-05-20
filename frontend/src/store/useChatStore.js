import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => ({
  selectedUser: null,
  messages: [],
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("messages/users");
      if (res.status === 200) {
        set({ users: res.data });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
      if (res.status === 200) {
        set({ messages: res.data });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
  sendMessage: async (messageData) => {
    set({ isMessagesLoading: true });
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `messages/send/${selectedUser._id}`,
        messageData
      );
      if (res.status === 201) {
        set({ messages: [...messages, res.data] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  subscribeToNewMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return; //sender ben select melis // mesajlar karışmaması için yapıldı
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromNewMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
