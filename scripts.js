
document.addEventListener('DOMContentLoaded', function () {
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
});
