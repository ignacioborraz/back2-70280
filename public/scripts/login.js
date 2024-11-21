const selector = document.querySelector("#login")

selector.addEventListener("click", async (event)=>{
    try {
        event.preventDefault()
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        }
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        // let response = await fetch("http://localhost:8080/api/sessions/login", options) 
        // si estan en otro repositorio de front tienen que fetchear la URL COMPLETA!!!
        // aca como estamos dentro del servidor ME AHORRO LOCALHOST
        let response = await fetch("/api/sessions/login", options) 
        response = await response.json()
        if (response.token) {
            localStorage.setItem("token", response.token)
            location.replace("/")
        } else {
            alert("INVALID CREDENTIALS")
        }
    } catch (error) {
        alert(error.message)
    }
})