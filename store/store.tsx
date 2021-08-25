import { types } from "mobx-state-tree";

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
  .model({
    user: types.maybe(UserModel),
  })
  .actions((self) => {
    return {
      setUser(data) {
        self.user = data;
      },
    };
  });

export const store = UserStore.create({});
