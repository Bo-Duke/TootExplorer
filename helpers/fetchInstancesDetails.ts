import { Instance, InstanceObjects } from '~~/types/types';

export async function fetchInstancesDetails(instances: Instance[]): Promise<InstanceObjects> {
    const updatedInstances = [];
    const errorInstances = [];
    const instancePromises = instances.map(async (instance) => {
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(`${instance.instance}/api/v2/instance`, { signal: controller.signal });
        clearTimeout(id);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const instanceInfo = await response.json();
        return {
          instance: instance.instance,
          users: instance.users,
          ...instanceInfo
        };
      } catch (error) {
        console.error(`Error while fetching info for instance: ${instance.instance}`, error);
        return {
          instance: instance.instance,
          users: instance.users,
          error,
        };
      }
    });
    const results = await Promise.all(instancePromises);
    for (const result of results) {
      if (result.error) {
        errorInstances.push(result);
      }
      else {
        updatedInstances.push(result);
      }
    }
    return { updatedInstances, errorInstances };
  }
  