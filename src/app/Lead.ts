import { AvatarUrls } from "./AvatarUrls";

export interface Lead {
    accountId: string;
    expand: string;
    avatarUrls: AvatarUrls; // Replace 'AvatarUrls' with the actual type if it's not 'AvatarUrls'
    displayName: string;
    accountType: string;
    self: string;
    active: boolean;
}