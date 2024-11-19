const url = "http://localhost:8080/api/sessions/online"
const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json", token: localStorage.getItem("token") },
}

async function verifyOnline() {
    let response = await fetch(url, opts)
    response = await response.json()
    console.log(response);    
    const { online } = response
    console.log(online);
    if (online) {
        document.querySelector("#navbar").innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="products.html">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="createProduct.html">Create Product</a>
          </li>
          `
    }
}

verifyOnline()