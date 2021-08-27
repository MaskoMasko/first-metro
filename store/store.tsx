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
const UserStore = types
  .model("UserStore", {
    user: types.maybe(UserModel),
    userKeys: types.array(types.string),
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
          console.log(res.data);
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
          console.log(res.config);
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
          self.setUser(res.data);
        });
      },
      sendMessage: () => {
        axios({
          method: "post",
          url: "http://mockapi.ddns.net/message",
          data: {
            message: "gotoyes",
          },
          headers: {
            "content-type": "application/json",
          },
        }).then((res: any) => {
          console.log(res.config);
        });
      },
      // session: () => {
      //   axios({
      //     method: "get",
      //     url: "http://mockapi.ddns.net/sessionData",
      //   }).then((res: any) => {
      //     self.setUser(res.data);
      //     console.log("SESSION:");
      //     console.log(res.data);
      //   });
      // },
    };
  });

export const store = UserStore.create({});
