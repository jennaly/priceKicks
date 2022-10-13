function showLoader(event) {
    document.getElementById("progress").classList.remove("hidden")
    event.preventDefault();
}

document.getElementById("form").addEventListener("submit", showLoader)