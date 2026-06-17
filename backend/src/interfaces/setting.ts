export type ThemeType = 'dark' | 'default'

export type Setting = {
    id? : string,
    uid : string,
    email : boolean,
    remind : boolean,
    dueDataAlert : boolean,
    theme: ThemeType,
    active?: boolean,
    deletedAt?: string | object,
    updatedAt?: string | object,
    createdAt?: string | object,
}