var pg_idx = 1;
const pg_hidden = 6;
document.onkeydown = arrowKeyChecker;

function darkToggle() {
    var element = document.body;
    // Sets the other parts of body
    var tiger_light = document.getElementById("tiger_light");
    var tiger_dark = document.getElementById("tiger_dark");
    var hidden_img_light = document.getElementById("hidden_img_light");
    var hidden_img_dark = document.getElementById("hidden_img_dark");

    if (element.classList.contains("dark-mode")) {
        //tiger_img.src = "imgs/tiger light.png";
        tiger_light.style.opacity = "1";
        tiger_light.style.visibility = "visible";
        tiger_dark.style.opacity = "0";
        tiger_dark.style.visibility = "hidden";
        hidden_img_light.style.opacity = "1";
        hidden_img_light.style.visibility = "visible";
        hidden_img_dark.style.opacity = "0";
        hidden_img_dark.style.visibility = "hidden";
    } else {
        //tiger_img.src = "imgs/tiger dark.png";
        tiger_light.style.opacity = "0";
        tiger_light.style.visibility = "hidden";
        tiger_dark.style.opacity = "1";
        tiger_dark.style.visibility = "visible";
        hidden_img_light.style.opacity = "0";
        hidden_img_light.style.visibility = "hidden";
        hidden_img_dark.style.opacity = "1";
        hidden_img_dark.style.visibility = "visible";
    }

    // Recolors the footer parts
    document.getElementsByClassName("footer")[0].classList.toggle("footer_dark");
    var dots = document.getElementsByClassName("dot");
    var i;
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("dot_dark");
    }
    var darkToggle = document.getElementsByClassName("darkToggle");
    darkToggle[0].classList.toggle("darkToggle_dark");

    document.getElementsByClassName("hiddenDot")[0].classList.toggle("hiddenDot_dark");

    // Recoors the next/prev buttons
    document.getElementsByClassName("prev")[0].classList.toggle("prev_dark");
    document.getElementsByClassName("next")[0].classList.toggle("next_dark");


    // Sets the main body dark mode
    element.classList.toggle("dark-mode");
}

function show_Page(n) {
    var i;
    var outer_pages = document.getElementsByClassName("outer_page_div");
    var dots = document.getElementsByClassName("dot");
    var hidden_dot = document.getElementsByClassName("hiddenDot");
    hidden_dot[0].className = hidden_dot[0].className.replace(" hiddenDot_active", "");

    // The hidden tiger img is kinda buggy, this is an attempt to work around it :
    var hidden_img_divs = document.getElementsByClassName("hidden_img_div");
    for (i = 0; i < hidden_img_divs.length; i++) {
        hidden_img_divs[i].style.opacity = "0";
    }

    // Allows returning to the first page from the hidden page
    if (pg_idx > pg_hidden - 1) {
        pg_idx = 1;
    }

    // Hides the other outer_pages
    for (i = 0; i < pg_hidden; i++) {
        outer_pages[i].style.height = "0";
        outer_pages[i].style.opacity = "0";
        outer_pages[i].style.visibility = "hidden";
        outer_pages[i].style.scale = "0";
    }

    // Shows the current page
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot_active", "");
    }
    outer_pages[pg_idx - 1].style.opacity = "1";
    outer_pages[pg_idx - 1].style.visibility = "visible";
    outer_pages[pg_idx - 1].style.height = "100%";
    outer_pages[pg_idx - 1].style.scale = "1";
    dots[pg_idx - 1].className += " dot_active";

    // Hides the prev/next buttons on first/last page
    var prev = document.getElementsByClassName("prev");
    var next = document.getElementsByClassName("next");
    if (pg_idx === 1) {
        prev[0].style.opacity = "0";
        prev[0].style.visibility = "hidden";
        next[0].style.opacity = "1";
        next[0].style.visibility = "visible";
    } else if (pg_idx === (pg_hidden - 1)) {
        prev[0].style.opacity = "1";
        prev[0].style.visibility = "visible";
        next[0].style.opacity = "0";
        next[0].style.visibility = "hidden";
    } else {
        prev[0].style.opacity = "1";
        prev[0].style.visibility = "visible";
        next[0].style.opacity = "1";
        next[0].style.visibility = "visible";
    }
}

function change_Page(n) {
    show_Page(pg_idx = n);
}

function relative_Page(n) {
    show_Page(pg_idx += n);
}

function show_Hidden_Page() {
    var outer_pages = document.getElementsByClassName("outer_page_div");
    var dots = document.getElementsByClassName("dot");
    var hidden_dot = document.getElementsByClassName("hiddenDot");

    // The hidden tiger img is kinda buggy, this is an attempt to work around it :
    var hidden_img_divs = document.getElementsByClassName("hidden_img_div");
    for (i = 0; i < hidden_img_divs.length; i++) {
        hidden_img_divs[i].style.opacity = "1";
    }

    // Hides the other outer_pages
    for (i = 0; i < pg_hidden; i++) {
        outer_pages[i].style.opacity = "0";
        outer_pages[i].style.visibility = "hidden";
        outer_pages[i].style.height = "0";
    }

    // shows the hidden page
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot_active", "");
    }
    pg_idx = pg_hidden;
    outer_pages[pg_idx - 1].style.opacity = "1";
    outer_pages[pg_idx - 1].style.visibility = "visible";
    outer_pages[pg_idx - 1].style.height = "100%";
    hidden_dot[0].className += " hiddenDot_active";

    // Reshow the prev/next buttons
    var prev = document.getElementsByClassName("prev");
    var next = document.getElementsByClassName("next");
    prev[0].style.opacity = "1";
    prev[0].style.visibility = "visible";
    next[0].style.opacity = "1";
    next[0].style.visibility = "visible";

}

function arrowKeyChecker() {
    var keyInput = window.event;

    if (keyInput.keyCode == '37') { // Left Arrow Key
        if (pg_idx > 1) {
            relative_Page(-1);
        }
    }
    else if (keyInput.keyCode == '39') { // Right Arrow Key
        if (pg_idx < pg_hidden - 1) {
            relative_Page(1);
        }
    }
}