import { Instance, User } from "../types/types";

export const generateInstanceList = (list: User[]): Instance[] => {
  return list.reduce((acc, user) => {
    const url = new URL(user.url);
    const instance = url.protocol + '//' + url.host;
    const instanceData = acc.find((data: Instance) => data.instance === instance);
    if (instanceData) {
      instanceData.users.push(user);
    } else {
      acc.push({
        instance,
        users: [user],
      });
    }
    return acc;
  }, [] as Instance[]).sort((a, b) => b.users.length - a.users.length);
};
