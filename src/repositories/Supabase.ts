import { ICP } from '@/qualifier/model/entity.ts';

export function saveICP(ICP: ICP): Promise<void> {
  console.error('Sorry! No data persistence on the demo ;)');
  return new Promise(() => {});
}

export function getICP(icpId: string): Promise<ICP> {
  console.error('Sorry! No data persistence on the demo ;)');
  return new Promise(() => {});
}
