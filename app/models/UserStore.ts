import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    name: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    score: types.optional(types.number, 0),
    lastAccess: types.maybe(types.string),
    createdAt: types.maybe(types.string),
  })
  .views((store) => ({
    get userInitials() {
      return store.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    },
  }))
  .actions((store) => ({
    reset() {
      store.name = ""
      store.email = ""
      store.score = 0
      store.lastAccess = undefined
      store.createdAt = undefined
    },

    setUser(userData: {
      name: string
      email: string
      score: number
      last_access: string
      created_at: string
    }) {
      store.name = userData.name
      store.email = userData.email
      store.score = userData.score
      store.lastAccess = userData.last_access
      store.createdAt = userData.created_at
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
