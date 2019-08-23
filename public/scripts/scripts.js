"use strict";
$(function () {

    $("#categoryContainer").hide();

    $('#homePage').on("click", function () {
        $("#servicesCategories").hide();
        $("#homePagediv").show();
  
    });

    $('.servicesBtn').on("click", function () {
        $("#homePagediv").hide();
        $("#servicesCategories").show();
        $("#categoryContainer").show();
    });

    $.getJSON('/api/categories/', function (categories) {

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

    $('#viewCategories').on("click", function () {
        $("#categoryContainer").show();
        $('#viewCategories').prop('disabled', true);
    });
});

function getServices(category) {
    $('#serviceCard').hide('');
    $("#serviceList").html('');

    $.getJSON(`/api/services/bycategory/${category}`, (services)=> {
        $.each(services, (index, service) => {
            $('#serviceList').append($('<li />')
                .text(service.ServiceName)
                .attr("class", "list-group-item list-group-item-action")
                .on('click', function (e) {
                    e.preventDefault();
                    getProduct(service.ServiceID);
                }));
        });
    });
    $('#servicesContainer').show();
}

function getProduct(serviceid) {
    $.getJSON(`/api/services/${serviceid}`,(service) => {
        $('#cardTitle').html(service.ServiceName);
        $('#cardText1').html(service.Description);
        $('#cardText2').html(service.Minutes+" Minutes");
        $('#cardText3').html("$" + Number(service.Price).toFixed(2));
        $('#cardText4').attr("src","/images/"+service.Images);
        $('#cardText4').attr("alt",service.ServiceName);
        $('#serviceCard').show();
    });
}

