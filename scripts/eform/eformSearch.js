$(function () {
    $('#myFormSearch').click(function () {
        searchMyForm();
    });

    $("#myFormSearchTerm").on("keydown", function search(e) {
        if (e.keyCode == 13) {
            searchMyForm();
        }
    });

});

function searchMyForm() {
    var searchTerm = $.trim($('#myFormSearchTerm').val());

    $("#contactSearchResults").html('');

    if (searchTerm.length > 0) {

        $.ajax({
            type: "Get",
            url: "/Eform/searchMyForms/",
            data: { term: searchTerm },
            cache: false
        }).done(function (data) {
            isAjaxRequestTimeOut(data);
            $("#myFormSearchResults").html(data);

        }).fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    }
}