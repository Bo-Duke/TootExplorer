import { InstanceWithInfo, SortingType } from "~~/types/types";

export const sortInstances = (instanceList: InstanceWithInfo[], sort: SortingType = 'smart') => {
    console.log('sort', sort);
    switch (sort) {
        case 'smart':
            return smartSort(instanceList);
        case 'friends':
            return instanceList.sort((a, b) => b.users.length - a.users.length);
        case 'users':
            return instanceList.sort((a, b) => b.usage.users.active_month - a.usage.users.active_month);
        default:
            return instanceList;
    }
}

export const smartSort = (instanceList: InstanceWithInfo[]) => {
    const mainInstances = instanceList.filter(ins => ins.usage.users.active_month >= 10 && ins.users.length > 1);
    const lonelyInstances = instanceList.filter(ins => ins.usage.users.active_month >= 10 && ins.users.length === 1);
    const smallInstances = instanceList.filter(ins => ins.usage.users.active_month < 10 && ins.registrations.enabled);
    const privateInstances = instanceList.filter(ins => ins.usage.users.active_month < 10 && !ins.registrations.enabled);
    
    return [
        ...mainInstances.sort((a, b) => getUserPercentage(b) - getUserPercentage(a)),
        ...lonelyInstances.sort((a, b) => getUserPercentage(b) - getUserPercentage(a)),
        ...smallInstances.sort((a, b) => b.users.length - a.users.length),
        ...privateInstances.sort((a, b) => b.users.length - a.users.length),
    ]
}

const getUserPercentage = (instance: InstanceWithInfo) =>
  (instance.users.length / instance.usage.users.active_month) * 100
