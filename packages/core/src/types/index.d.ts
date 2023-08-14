import type { JSX, Component } from 'solid-js'

declare global {
  type Component<P = {}> = (props: P & { children?: JSX.Element }) => JSX.Element

  type PickTypeFromField<T, K extends keyof T> = T[K]

  interface InputEvent {
    start: Date
    end: Date
    id: any
  }

  // interface ChatMessage {
  //     message: any
  //     id: string | number
  // }

  interface EventCalendarOptions {
    events: InputEvent[]
    // timeZone ?: string;
    // dailyGridOptions : dailyGridOptions;
    // calnedarMode : CalnedarMode
  }

  // interface Room {
  //   messages: ChatMessage[]
  // }

  interface SetAllChatsAction {
    type: 'SET_ALL_EVENTS'
    events: InputEvent[]
  }

  type Action = SetAllChatsAction

  // type StoreAction = {'SET_ALL_CHATS' , rooms : ChatMessage[]} | {'ADD_SINGLE_CHAT', chat : ChatMessage}

  // interface RoomMap {
  //     [key: PickTypeFromField<ChatMessage,'id'>]: Room[]
  // }

  // interface BaseChatOptions {
  //     rooms :  Room[]
  // }

  // interface StateAction {
  //     type : string
  // }

  // interface ChatOptions extends BaseChatOptions {

  // }

  // interface ChatStore extends BaseChatOptions{

  // }
}

// import type { JSX, Component } from 'solid-js';
// type Component<P = {}> = (props: P & { children?: JSX.Element }) => JSX.Element;
