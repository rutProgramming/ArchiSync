import { User } from "./types";

export interface Project {
    title: string;
    description: string;
    ownerId: number|undefined;
    isPublic?: boolean;
    parentId?: number | null;
    type: ProjectType;
    status: ProjectStatus;
    location: string;
    endDate?: Date | string | null;
    clientUserName: string;
    projectImage?: string;
    architectUserNames: string[];
}
export type ProjectType =  'Residential' | 'Commercial' | 'Mixed';
export type ProjectStatus =  'Planning' | 'InProgress' | 'Completed' | 'OnHold';



 export interface ProjectDTO
    {
        id: number;
        title: string;
        description: string;
        parentId?: number | null;
        ownerId: number;
        owner: Partial<User>;
        isPublic: boolean;
        type: 'Residential' | 'Commercial' | 'Mixed';
        status: 'Planning' | 'InProgress' | 'Completed' | 'OnHold';
        location: string;
        projectImage: string;
        clientUserName: string;
        client: User;
        startDate: Date;
        updatedAt: Date;
        endDate?: Date | null;
        files: File[];
        // permissions: ProjectPermission[];
        architectUserNames: string[];
        architects: User[];

    }











