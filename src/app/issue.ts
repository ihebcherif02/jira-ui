export interface Issue {
    id: string;
    self: string;
    key: string;
    fields: Fields;
}

export interface Fields {
    project: Project;
    issuetype: IssueType;
    status: Status;
    resolution: Resolution;
    summary: string;
    creator: User;
    reporter: User;
    sprint: Sprint;
}

export interface Project {
    id: string;
    name: string;
}

export interface IssueType {
    id: string;
    name: string;
}

export interface Status {
    id: string;
    name: string;
}

export interface Resolution {
    id: string;
    name: string;
}

export interface User {
    accountId: string;
    emailAddress: string;
}

export interface Sprint {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}