window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }
    ;

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
$.getJSON("assets/devices-data/devices.json", function (data) {
    // Portfolyo öğelerini oluştur
    $.each(data, function (key, value) {
        const devicesItem = `
          <div class="col-lg-4 col-sm-6 mb-4">
            <div class="devices-item" data-device="${value.deviceName}" data-description="${value.description}" data-client="${value.client}" data-category="${value.category}" data-imageurl="${value.imageUrl}">
              <a class="devices-link" data-bs-toggle="modal" href="#devicesModal">
                <div class="devices-hover">
                  <div class="devices-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="${value.imageUrl}" alt="${value.deviceName}" />
              </a>
              <div class="devices-caption">
                <div class="devices-caption-heading">${value.deviceName}</div>
                <div class="devices-caption-subheading text-muted">${value.description}</div>
              </div>
            </div>
          </div>
        `;

        // HTML'e ekle
        $("#devices .row").append(devicesItem);
    });

    // Modal içeriğini dinamik olarak ayarla
    $(".devices-item").click(function () {
        const device = $(this).data("device");
        const description = $(this).data("description");
        const client = $(this).data("client");
        const category = $(this).data("category");
        const imageUrl = $(this).data("imageurl");

        $("#devicesModal .modal-body h2").text(device);
        $("#devicesModal .modal-body .item-intro").text(description);
        $("#devicesModal .modal-body ul li .client").text(client);
        $("#devicesModal .modal-body ul li .category").text(category);
        $("#devicesModalImage").attr("src", imageUrl);
    });
}).fail(function (jqXHR, textStatus, error) {
    console.log("Hata: " + textStatus);
    console.log("İstisna: " + error);
});

$.getJSON('assets/devices-data/products.json', function (data) {
    const products = data.products;
    const productCarouselInner = $('#productCarouselInner');

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const title = product.title;
        const features = product.features;
        const image = product.image;

        const productHTML = `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <div class="row justify-content-center">
            <div class="col-md-4">
              <h3>${title}</h3>
              <ul>
                ${features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            <div class="col-md-4">
              <img src="${image}" class="d-block rounded mx-auto" style="width: 150px; height: 150px" alt="${title}">
            </div>
          </div>
        </div>
      `;
        productCarouselInner.append(productHTML);
    };
}).fail(function (jqXHR, textStatus, error) {
    console.log("Hata: " + textStatus);
    console.log("İstisna: " + error);
});

