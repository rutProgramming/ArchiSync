interface UserServer {
  Email: string;
  UserName: string;
  RoleName: string;
  Password: string;
}
interface User {

  createdAt:Date;
  email:string;
  updatedAt:Date;
  userId:number;
  userName:string;
  roleName:string;
  password:string;



}

export type { User ,UserServer};