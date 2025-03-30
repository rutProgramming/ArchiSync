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
export type Project = {
  id: number,
  description:string,
  isPublic:boolean
  name:string,
  ownerId:number
  parentId:number
  owner:User
}
export type PartialProject = Partial<Project>
export type Message = {
  id: number,
  userIsRead : boolean,
  architectIsRead : boolean,  
  approved: boolean,
  userId: number,
  projectId: number,
  architectId: number
}
export type PartialMessage = Partial<Message>

export type ProjectPermission = {
  id: number,
  userId:number
  projectId:number
}
export type PartialProjectPermission = Partial<ProjectPermission>

export type File ={
  id:number,
  fileName:string,
  fileType:string,
  ownerId:number,
  projectId:number,
  project:Project,
  s3Key:string,
  size:number
}
export type PartialFile = Partial<File>