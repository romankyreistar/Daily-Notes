export interface AuthState {
  logged: boolean;
  user?: User;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface User {
  name: string;
}

export interface Note {
  id?: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
  audio?: string;
}
