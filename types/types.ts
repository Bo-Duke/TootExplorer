export interface InstanceWithInfo extends Instance {
  [key: string]: any;
}

export interface InstanceInError extends Instance {
  error: string,
}

export interface InstanceObjects {
  updatedInstances: InstanceWithInfo[],
  errorInstances: InstanceInError[],
}

export interface User {
  acct: string;
  display_name: string;
  url: string;
}

export interface Instance {
  instance: string;
  users: User[];
}

export type SortingType = 'smart' | 'friends' | 'users';