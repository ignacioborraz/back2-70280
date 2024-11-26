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
        let response = await fetch("/api/sessions/login", options) 
        response = await response.json()
        if (response.message === "USER LOGGED IN") {
            location.replace("/")
        } else {
            alert("INVALID CREDENTIALS")
        }
    } catch (error) {
        alert(error.message)
    }
})