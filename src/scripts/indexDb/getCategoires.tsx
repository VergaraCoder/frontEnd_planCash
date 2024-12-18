

export const GetAllCategoires = async (db:any) => {
    return await db.getAll("categories");
}