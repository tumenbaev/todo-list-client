import { createContext, Dispatch, ReducerAction } from 'react'
import { Action, State } from '../types'

type D = Dispatch<ReducerAction<(state: State, action: Action) => State>>

const DispatchContext = createContext<D>(null as unknown as D)

export default DispatchContext
