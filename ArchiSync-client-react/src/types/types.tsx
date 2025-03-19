export type User  ={
   id: number,
   userName:string,
   email :string,
   password:string,
   roleName :string,
   token :string
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
  Id: number,
  Name: string,
  OwnerId: number,
  IsPublic:boolean
 
}
export type PartialProjects = Partial<Projects>
export type PartialFolder = Partial<Folder>


