export type Setting = {
    id? : string,
    uid : string,
    email : boolean,
    remind : boolean,
    dueDataAlert : boolean,
    theme: 'light' | 'dark' | 'system',
    active?: boolean
    deletedAt?: string | object
    updatedAt?: string | object
    createdAt?: string | object
}