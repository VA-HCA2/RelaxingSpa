// This program helps the user find a service from a spa serching results by categories. Once the category 
// is selected the user can select different services from that category. 
//Author : Vanessa Arce

// Onload function
"use strict";
$(function () {
    // hide category container
    $("#categoryContainer").hide();
    //When the user clicks on home hide the category container and show the home page container
    $('#homePage').on("click", function () {
        $("#servicesCategories").hide();
        $("#homePagediv").show();

    });
    // When the user clicks on services hide home page container and show category container and services 
    $('.servicesBtn').on("click", function () {
        $("#homePagediv").hide();
        $("#servicesCategories").show();
        $("#categoryContainer").show();
    });
    // get data from JSON file
    $.getJSON('/api/categories/', function (categories) {
        // Create my category list dropdown
        $.each(categories, function (index, category) {
            $('#categoryList').append($('<a/>')
                .attr('class', 'dropdown-item')
                .text(category.Category)
                .attr('href', '#')
                .on('click', function (e) {
                    e.preventDefault();
                    $('#categoryName').text(category.Category);
                    getServices(category.Value);
            }));
        });
    });
});

// Get Services function 
function getServices(category) {
    // Fade effect
    $('#serviceCard').hide('');
    $("#serviceList").html('');
  // get data from JSON file
    $.getJSON(`/api/services/bycategory/${category}`, (services) => {
        // Create services 
        $.each(services, (index, service) => {
            $('#serviceList').append($('<li />')
                .text(service.ServiceName)
                .attr("class", "list-group-item list-group-item-action")
                .on('click', function (e) {
                    e.preventDefault();
                    getServiceInfo(service.ServiceID);
                }));
        });
    });
    $('#servicesContainer').show();
}
// Function for cards 
function getServiceInfo(serviceid) {
    $.getJSON(`/api/services/${serviceid}`, (service) => {
        $('#cardTitle').html(service.ServiceName);
        $('#cardText1').html(service.Description);
        $('#cardText2').html(service.Minutes + " Minutes");
        $('#cardText3').html("$" + Number(service.Price).toFixed(2));
        $('#cardText4').attr("src", "/images/" + service.Images);
        $('#cardText4').attr("alt", service.ServiceName);
        $('#serviceCard').show();
    });
}

