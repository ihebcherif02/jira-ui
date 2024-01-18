export interface Sprint {
    id: string;
    self: string;
    state: string;
    name: string;
    startDate: Date;
    endDate: Date;
    completeDate: Date;
    originBoardId: string;
    goal: string;
}