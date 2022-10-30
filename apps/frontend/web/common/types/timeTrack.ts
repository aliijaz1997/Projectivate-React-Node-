import { User } from ".";

export interface TimeTrack {
  id: string;
  startDate: string;
  endDate: string;
  taskId: string;
  userId: string;
  userName: string;
}

export interface TimeTrackWithAllUsers {
  timeRecords: TimeTrack[];
  users: User[];
}
export interface createTimer {
  startTime: string;
  endTime: string;
}
