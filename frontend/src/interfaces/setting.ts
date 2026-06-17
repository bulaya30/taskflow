export type ThemeType = 'dark' | 'default'

export interface Setting {
    id: string | number,
    uid: string | number,
    email: boolean,
    theme: ThemeType,
    remind: boolean,
    dueDateAlert: boolean,
}

export interface SettingInputs {
    email: boolean,
    remind: boolean,
    dueDateAlert: boolean,
}