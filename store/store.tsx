import { types, flow, getRoot } from "mobx-state-tree";
import axios from "axios";

const UserModel = types.model("user", {
  created_at: types.string,
  email: types.string,
  email_verified_at: types.null,
  id: types.number,
  image: types.string,
  name: types.string,
  updated_at: types.string,
});
const MessageModel = types.model("message", {
  content: types.string,
  created_at: types.string,
  id: types.number,
  updated_at: types.null,
  user: UserModel,
  user_id: types.number,
});

const UserStore = types
  .model("UserStore", {
    user: types.maybe(UserModel),
    userKeys: types.array(types.string),
    allMessages: types.array(MessageModel),
    yourMessages: types.array(types.string),
  })
  .actions((self) => {
    return {
      setUser(data) {
        if (data == "NOT LOGGED IN") {
          self.user = undefined;
          return;
        }
        self.user = data;
      },
      setUserToNothing() {
        self.user = undefined;
      },
      setUserKeys(key) {
        self.userKeys.push(key);
      },
      getFirst(arr) {
        return arr.splice(0, 1);
      },
      setAllMessages(data) {
        for (let message of data) {
          self.allMessages.push(message);
        }
      },
      setYourMessages(message) {
        self.yourMessages.push(message);
      },
    };
  })
  .actions((self) => {
    return {
      logout: () => {
        axios({
          method: "post",
          url: "http://mockapi.ddns.net/logout",
          headers: {
            "content-type": "application/json",
          },
        }).then((res: any) => {
          console.log("LOGOUT:");
          // console.log(res.data);
        });
      },
      login: (email: string, password: string) => {
        axios({
          method: "post",
          url: "http://mockapi.ddns.net/login",
          data: {
            email: email,
            password: password,
          },
          headers: {
            "content-type": "application/json",
          },
        }).then((res: any) => {
          // console.log(res.config);
        });
      },
      islogged: () => {
        axios({
          method: "get",
          url: "http://mockapi.ddns.net/checkIfLoggedIn",
        }).then((res: any) => {
          if (res == undefined) {
            return res.data;
          }
          // self.setUser(res.data);
          // console.log(res.data);
        });
      },
      sendMessage: (mess) => {
        axios({
          method: "post",
          url: "http://mockapi.ddns.net/message",
          data: {
            message: mess,
            name: self.user.name,
            image: self.user.image,
          },
          headers: {
            "content-type": "application/json",
          },
        }).then((res: any) => {
          self.setYourMessages(mess);
          console.log(res);
        });
      },
      getMessages: () => {
        axios({
          method: "get",
          url: "http://mockapi.ddns.net/getMessage?whereToStart=0&howMany=15",
        }).then((res: any) => {
          self.setAllMessages(res.data);
        });
      },
      session: () => {
        axios({
          method: "get",
          url: "http://mockapi.ddns.net/sessionData",
        }).then((res: any) => {
          console.log("SESSION:");
          // console.log(res.data);
          if (res.data != null) {
            self.setUser(res.data);
          } else {
            self.setUserToNothing();
          }
        });
      },
    };
  });

export const store = UserStore.create({});
