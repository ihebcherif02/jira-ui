import { AvatarUrls } from "./AvatarUrls";
import { Lead } from "./Lead";

export interface Project {
    avatarUrls: AvatarUrls; // Replace 'any' with the actual type of AvatarUrls
    description: string;
    entityId: string;
    isPrivate: boolean;
    uuid: string;
    lead: Lead;
    expand: string;
    simplified: boolean;
    name: string;
    self: string;
    style: string;
    id: number;
    projectTypeKey: string;
    key: string;
    properties: any; // Replace 'any' with the actual type of properties
}
