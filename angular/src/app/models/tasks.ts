
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
    assignEmployee : string[] = [];
    Status : number ;

    constructor(name: string, comment: string, assignEmployee : string[], status : number) {
        this.name = name;
        this.comment = comment;
        this.assignEmployee = assignEmployee;
        this.Status = status;
    }


}