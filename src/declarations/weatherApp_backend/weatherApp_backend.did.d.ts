import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type List = [] | [[string, List]];
export interface _SERVICE {
  'fetchList' : ActorMethod<[], List>,
  'put' : ActorMethod<[string], string>,
}
