document.querySelector('#Payout').style.display = "none"

function toggleTable(event, table) {
    let i, tabcontent, tablinks

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" tab-active", " ");
    }

    document.getElementById(table).style.display = "block";
    event.currentTarget.className += " tab-active"
}

