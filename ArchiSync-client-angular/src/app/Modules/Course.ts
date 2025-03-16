import { Lesson } from "./Lesson";

export class Course {
    public id: string;
    public title: string;
    public description: string;
    public teacherId: string;
    public lessons: Lesson[];

    
    constructor(id:string,title: string,description:string,teacherId:string, lessons: Lesson[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.teacherId = teacherId
        this.lessons = lessons;
    }
}

