export const UpdatedBackEndAllCategories = async (data: any[]) => {
    try {        
    const token=localStorage.getItem("acces_token");

        const response: Response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/categories/final`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
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
