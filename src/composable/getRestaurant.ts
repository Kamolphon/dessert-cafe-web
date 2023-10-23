const ROOT_API = import.meta.env.VITE_ROOT_API
const fetchRestaurantData = async () => {
    try {
            const response = await fetch(`${ROOT_API}`);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            localStorage.setItem("restaurant", JSON.stringify(responseData));
            return responseData
    } catch (error) {
        console.log(error);
    }
};

export { fetchRestaurantData }