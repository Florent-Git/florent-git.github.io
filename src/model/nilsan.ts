import { from, groupBy, lastValueFrom, map, mergeMap, toArray } from "rxjs";

export interface Person {
  id: string,
  name: string;
  group: NilsanGroup
}

export enum NilsanGroup {
  FR = "FR",
  JP = "JP"
}

export async function makeGroups(
  peopleList: Person[], 
  nGroups: number
): Promise<Person[][]> {
  const observable = from(peopleList).pipe(
    groupBy(p => p.group),
    mergeMap(group => {
      let i = 0;
      return group.pipe(
        map(p => ({ ...p, __index: (i++) % nGroups }))
      )
    }),
    groupBy(p => p.__index),
    mergeMap(group => group.pipe(
      map(p => ({ name: p.name, group: p.group, id: p.id } as Person)),
      toArray()
    )),
    toArray()
  )

  return await lastValueFrom(observable);
}