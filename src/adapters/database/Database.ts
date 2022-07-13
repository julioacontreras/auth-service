export interface Database {
    models: {
        User: () => {
            findByEmail: <T>(email: string) => Promise<T>
            register: <T>(user: T) => Promise<{ id:string }>
            update: <T>(id:string, user: T) => Promise<{ id:string }>
        }
    }
}
