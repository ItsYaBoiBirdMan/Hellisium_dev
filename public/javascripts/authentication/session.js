async function logoutUser() {
    try {
        let result = await logout();
        window.location = "index.html"
    } catch (err) {
        console.log(err);
    }
}
