export type User = {
  userId: number,
  userName: string,
  email: string,
  password: string,
  mainFolderId: number
  RoleName: string,
  token: string
}
export type Puser = Partial<User>
export type ActionReducer = {
  type: "SIGN_IN" | "SIGN_UP" | "UPDATE";
  data: Puser
}
export type ContextType = [Puser, React.Dispatch<ActionReducer>];

export type Projects = {
  id: number,
  title: string,
  description: string,

}

export type Folder = {
  id: number,
  name: string,
  description: string,
  ownerId: number,
  isPublic: boolean
  parentId: number
}
export type PartialProjects = Partial<Projects>
export type PartialFolder = Partial<Folder>


