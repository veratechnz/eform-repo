//===================================================

$(function () {
});

//===================================================

function loadClause(tabID) {
    var versionID = $("#versionID").val();

    $("#" + tabID).html("");

    $.ajax({
        type: "Get",
        url: "/Eform/loadFormClause/",
        data: { id: versionID },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        $("#" + tabID).html(data);
        $('#' + tabID).tab('show');

    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}


    
//===================================================