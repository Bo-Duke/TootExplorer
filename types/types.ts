export interface InstanceWithInfo extends Instance {
  [key: string]: any;
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
