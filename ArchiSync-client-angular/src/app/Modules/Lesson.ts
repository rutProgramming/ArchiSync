export class Lesson {
    public id: string;
    public title: string;
    public content: string;
    public courseId: string;


    constructor(title: string, content: string, courseId: string,id: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.courseId = courseId;

    }
}

