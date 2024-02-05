
export interface TaskInterface {
    data: {
        pendingTasks : Task[];
        onGoingTasks : Task[];
        completedTasks : Task[];
    }
    count : number
}


export class Task {
    _id!:string;
    name: string;
    comment: string;

    constructor(name: string, comment: string) {
        this.name = name;
        this.comment = comment;
    }


}