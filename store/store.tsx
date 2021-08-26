import { types, flow } from "mobx-state-tree";
import axios from "axios";

const UserModel = types.model("iva", {
  created_at: types.string,
  email: types.string,
  email_verified_at: types.null,
  id: types.identifierNumber,
  image: types.string,
  name: types.string,
  updated_at: types.string,
});

const UserStore = types
  .model("UserStore", {
    user: types.maybe(UserModel),
    isLogged: false,
  })
  .actions((self) => {
    return {
      setUser(data) {
        self.user = data;
      },
      checkIfLogged(data) {
        if (data.data == "NOT LOGGED IN") {
          self.isLogged = false;
        } else {
          self.isLogged = true;
        }
      },
      setLogged(bool) {
        self.isLogged = bool;
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
          console.log("LOGIN:");
          console.log(res.config);
        });
      },
      islogged: () => {
        axios({
          method: "get",
          url: "http://mockapi.ddns.net/checkIfLoggedIn",
        }).then((res: any) => {
          self.checkIfLogged(res);
        });
      },
      session: () => {
        axios({
          method: "get",
          url: "http://mockapi.ddns.net/sessionData",
        }).then((res: any) => {
          self.setUser(res.data);
          console.log("SESSION:");

          console.log(res.data);
        });
      },
    };
  });

export const store = UserStore.create({});
