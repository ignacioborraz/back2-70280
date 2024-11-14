const selector = document.querySelector("#register")

selector.addEventListener("click", async (event)=>{
    try {
        event.preventDefault()
        const data = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        // let response = await fetch("http://localhost:8080/api/sessions/register", options) 
        // si estan en otro repositorio de front tienen que fetchear la URL COMPLETA!!!
        // aca como estamos dentro del servidor ME AHORRO LOCALHOST
        let response = await fetch("/api/sessions/register", options) 
        response = await response.json()
        alert(response.message)
    } catch (error) {
        alert(error.message)
    }
})