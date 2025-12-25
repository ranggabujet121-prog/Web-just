let gelap = false;

function darkMode() {
    if (gelap === false) {
        document.body.classList.add("dark")
        gelap = true;
    } else {
        document.body.classList.remove("dark")
        gelap = false;
    }
}