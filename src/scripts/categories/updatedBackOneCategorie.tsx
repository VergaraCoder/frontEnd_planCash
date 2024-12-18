export const UpdatedBackEndCategories = async (data: any) => {
    try {
        const idBudgetInString: string | any = localStorage.getItem("budGetReal");
        const amount = Number(data.amount);
        const idCategory = data.id;
        const idBudGet = Number(JSON.parse(idBudgetInString));

        
        console.log("Iniciando petición al backend...");
        console.log(data);
    const token=localStorage.getItem("acces_token");
        
        const response: Response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/categories/${idCategory}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    dateStart: data.dateStart,
                    dateEnd: data.dateEnd,
                    amount: amount,
                    idBudget: idBudGet,
                }),
                credentials: "include",
            }
        );

        const dataResponse = await response.json(); // Leer respuesta una sola vez.

        if (!response.ok) {
            console.error("Error en la petición:", dataResponse);
            throw new Error(dataResponse.message);
        }


        console.log("Respuesta exitosa del backend:", dataResponse);
        return true;
    } catch (err: any) {
       throw err;
    }
};
