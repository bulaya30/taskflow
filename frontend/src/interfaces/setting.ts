export interface Setting {
    id: string | number,
    uid: string | number,
    email: boolean,
    theme: 'light' | 'dark' | 'system',
    remind: boolean,
    dueDateAlert: boolean,
}

export interface SettingInputs {
    email: boolean,
    remind: boolean,
    dueDateAlert: boolean,
}