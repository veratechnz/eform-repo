$(function () {
    $('#searchContact').keyup(function () {
        var searchTerm = $.trim($('#searchContact').val());

        if (searchTerm.length > 2) {
            $("#contactSearchResults").html('');

            $.ajax({
                type: "Get",
                url: "/Contact/searchContacts/",
                data: { term: searchTerm },
                cache: false
            }).done(function (data) {
                isAjaxRequestTimeOut(data);
                $("#contactSearchResults").html(data);

            }).fail(function (jqXHR, textStatus) {
                $("#contactSearchResults").html("Request failed: " + textStatus);
            });
        }

        if (searchTerm.length == 0) {
            $("#contactSearchResults").html('');
        }

        

    });

    //=======================================================================================

    $('#contVender').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
                url: "/Contact/searchContactsByType/",
                dataType: "json",
                data: {
                    term: $.trim($('#contVender').val()),
                    type: 1
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {

            $("#contVenderID").val(ui.item.id);
            $("#contVender").val(ui.item.firstName + " " + ui.item.lastName + " ( " + ui.item.displayName + " )");

            return false;
        },
        minLength: 3,
        delay: 100,
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        console.log(item);
        
        return $("<li></li>").append("<a>" + item.firstName + " " + item.lastName + " ( " + item.displayName + " ) </a>").appendTo(ul);
    };

    //=======================================================================================

    $('#contPurchaser').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
                url: "/Contact/searchContactsByType/",
                dataType: "json",
                data: {
                    term: $.trim($('#contPurchaser').val()),
                    type: 2
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {

            $("#contPurchaserID").val(ui.item.id);
            $("#contPurchaser").val(ui.item.firstName + " " + ui.item.lastName + " ( " + ui.item.displayName + " )");

            return false;
        },
        minLength: 3,
        delay: 100,
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {

        return $("<li>").data("item.uiAutocomplete", item).append("<a>" + item.firstName + " " + item.lastName + " ( " + item.displayName + " ) </a>").appendTo(ul);
    };

    //=======================================================================================

    $('#contSolicitor').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
                url: "/Contact/searchContactsByType/",
                dataType: "json",
                data: {
                    term: $.trim($('#contSolicitor').val()),
                    type: 3
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        select: function (event, ui) {

            $("#contSolicitorID").val(ui.item.id);
            $("#contSolicitor").val(ui.item.firstName + " " + ui.item.lastName + " ( " + ui.item.displayName + " )");

            return false;
        },
        minLength: 3,
        delay: 100,
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {

        return $("<li>").data("item.uiAutocomplete", item).append("<a>" + item.firstName + " " + item.lastName + " ( " + item.displayName + " ) </a>").appendTo(ul);
    };

    //=======================================================================================


});

function showAddModal(id) {
    $.ajax({
        type: "GET",
        url: "/Contact/LoadContactModal/" + id,
        cache: false,
        success: function (data) {

            //check if the user seesion is timeout when the ajax request is made
            isAjaxRequestTimeOut(data);
            $("#contactModalContent").html(data);
            $("#modal-add-contact").modal('show');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#contactModalContent").html(xhr.responseText);
            $("#modal-add-contact").modal('show');
        }
    });
}

function saveContact() {
    var isValid = $("#ContactForm").valid();
    var token = $('[name=__RequestVerificationToken]').val();

    if (isValid) {
        $.ajax({
            type: "POST",
            url: "/Contact/saveContact",
            dataType: "JSON",
            cache: false,
            headers: { "__RequestVerificationToken": token },
            data: $("#ContactForm").serialize(),
            success: function (data) {

                //check if the user seesion is timeout when the ajax request is made
                isAjaxRequestTimeOut(data);

                if (data.status) {
                    $("#modal-add-contact").modal('hide');

                    alert("Contact Saved!");
                    $('.nav-tabs a[href=#quick_sidebar_tab_7]').tab('show');
                }

                $("#saveContactError").html(data.message);
                $("#saveContactError").show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
            }
        });
    }
}

