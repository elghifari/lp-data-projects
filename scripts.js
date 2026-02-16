
function updateQueueCount(tableId, counterId) {
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    let queueCount = 0;

    rows.forEach(row => {
        const statusCell = row.querySelector("td:nth-child(5)");
        if (
            statusCell &&
            statusCell.textContent.trim() === "Queue" &&
            row.offsetParent !== null
        ) {
            queueCount++;
        }
    });

    const counter = document.getElementById(counterId);
    if (counter) {
        counter.textContent = queueCount + " task(s) in Queue";
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById("doSearchInput");
    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase().trim();
        const rows = document.querySelectorAll("#doTable tbody tr");

        rows.forEach(row => {
            const division = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
            const assignee = row.querySelector("td:nth-child(3)").textContent.toLowerCase();

            if (
                division.includes(keyword) ||
                assignee.includes(keyword)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            } 
        });
    });

    const biSearchInput = document.getElementById("biSearchInput");
    biSearchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase().trim();
        const rows = document.querySelectorAll("#biTable tbody tr");

        rows.forEach(row => {
            const division = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
            const assignee = row.querySelector("td:nth-child(3)").textContent.toLowerCase();

            if (
                division.includes(keyword) ||
                assignee.includes(keyword)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }   
        });
    });

    document.querySelectorAll('.dropend > .dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let parent = this.parentElement;
            let submenu = parent.querySelector('.dropdown-menu');

            // Close all other submenus
            document.querySelectorAll('.dropend .dropdown-menu.show').forEach(function (menu) {
                if (menu !== submenu) {
                    menu.classList.remove('show');
                }
            });

            // Toggle this submenu
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });

    // Close active submenu when mouse leaves it
    document.querySelectorAll('.dropend .dropdown-menu').forEach(function (submenu) {
        submenu.addEventListener('mouseleave', function () {
            this.classList.remove('show');
        });
    });

    // Close active submenu when mouse enters another dropdown menu
    document.querySelectorAll('.dropend > .dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('mouseenter', function () {
            let parent = this.parentElement;
            let submenu = parent.querySelector('.dropdown-menu');
            document.querySelectorAll('.dropend .dropdown-menu.show').forEach(function (menu) {
                if (menu !== submenu) {
                    menu.classList.remove('show');
                }
            })
        })
    });

    // Close all submenus when parent dropdown closes
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (mainToggle) {
        mainToggle.addEventListener('hidden.bs.dropdown', function () {
            document.querySelectorAll('.dropend .dropdown-menu.show').forEach(function (submenu) {
                submenu.classList.remove('show');
            });
        });
    });

    updateQueueCount('biTable', 'biQueueCount');
    updateQueueCount('doTable', 'doQueueCount');
});    
