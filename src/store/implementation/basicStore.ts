/**
 * Represents an action object with a strongly-typed payload and a `type` property.
 * 
 * @template A - The type of the action map, where keys are action types and values are action payloads.
 * @template K - A specific action type (key) from the action map `A`.
 * 
 * @example
 * ```typescript
 * const action: Action<{ INCREMENT: { amount: number } }, 'INCREMENT'> = {
 *   type: 'INCREMENT',
 *   amount: 10,
 * };
 * ```
 */
export type Action<A, K extends keyof A> = A[K] & { type: keyof A };

/**
 * Represents a reducer object that maps action types to their corresponding reducer functions.
 * 
 * @template S - The type of the state managed by the reducer.
 * @template A - The type of the action map, where keys are action types and values are action payloads.
 * 
 * @example
 * ```typescript
 * const reducer: Reducer<number, { INCREMENT: { amount: number } }> = {
 *   INCREMENT: (state, action) => state + action.amount,
 * };
 * ```
 */
export type Reducer<S, A> = { [K in keyof A]: (state: S, action: A[K]) => S };

/**
 * Creates a reducer function that handles actions based on the provided reducer map.
 * 
 * @template S - The type of the state managed by the reducer.
 * @template A - The type of the action map, where keys are action types and values are action payloads.
 * 
 * @param reducer - An object that maps action types to their corresponding reducer functions.
 * 
 * @returns A reducer function that takes the current state and an action, and returns the new state.
 * 
 * @example
 * ```typescript
 * const reducer = createReducer({
 *   INCREMENT: (state, action) => state + action.amount,
 *   DECREMENT: (state, action) => state - action.amount,
 * });
 * 
 * const newState = reducer(0, { type: 'INCREMENT', amount: 10 });
 * console.log(newState); // Output: 10
 * ```
 */
export function createReducer<S, A>(reducer: Reducer<S, A>) {
  return <K extends keyof A>(state: S, action: Action<A, K>) => {
    // Create a deep copy of the state to ensure immutability.
    const newState = state; //structuredClone(state);

    // Invoke the appropriate reducer function based on the action type.
    return reducer[action.type](newState, action);
  };
}

export function createAction<A>(
  actionName: keyof A
): Action<A, keyof A>;

export function createAction<A>(
  actionName: keyof A,
  args: A[keyof A]
): Action<A, keyof A>;

export function createAction<A>(
  actionName: keyof A,
  args?: A[keyof A]
): Action<A, keyof A> {
  if (args == undefined) return {
    type: actionName
  } as Action<A, keyof A>

  return {
    ...args, type: actionName
  }
}