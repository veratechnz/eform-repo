$(function () {


    //==============================================
    initEditables();

    //==============================================
    $("#attatchedClauses").sortable({
        //Placeholder variable below for dotted outlines.
        placeholder: 'placeholder',

        connectWith: "#reinzClauses,#companyClauses,#memberClauses",
        receive: function (event, ui) {
            var clauseID = ui.item.attr("id").replace("c_", "");
            var versionID = $("#versionID").val();


            attachEformClause(versionID, clauseID);

            $('#' + ui.item.attr("id") + ' a').each(function (index) {

                initXeditableField($(this).attr("id"), versionID, clauseID);

            });
            var order = $("#attatchedClauses").sortable('serialize');
            saveEformClauseOrder(versionID, order);
        },
        stop: function (event, ui) {
            var versionID = $("#versionID").val();

            var order = $("#attatchedClauses").sortable('serialize');
            saveEformClauseOrder(versionID, order);
        },
    });

    $("#reinzClauses,#companyClauses,#memberClauses").sortable({
        //Placeholder variable below for dotted outlines.
        placeholder: 'placeholder',

        connectWith: "#attatchedClauses",
        receive: function (event, ui) {
            var clauseID = ui.item.attr("id").replace("c_", "");
            var versionID = $("#versionID").val();

            removeEformClause(versionID, clauseID);
            resetClauseContent(clauseID);
        }
    });

    //==============================================
    popolateClauseFields();


    //==============================================
});

function initXeditableField(id, versionID, clauseID) {
    $("#" + id).editable({
        url: '/Eform/SaveClauseValue/',
        params: { versionID: versionID, clauseid: clauseID },
        success: function (response, newValue) {
            isAjaxRequestTimeOut(response);

            if (!response.status) {
                alert("An error occurred when saving your data. \n please report this issue to REINZ.");
                loadClauses();
            }
        }
    });
}

function popolateClauseFields() {
    var versionID = $("#versionID").val();

    $('#attatchedClauses li').each(function (index) {
        var clauseID = $(this).attr("id").replace("c_", "");

        $('#' + $(this).attr("id") + ' a').each(function (index) {
            var id = $(this).attr("id");

            if (typeof id != 'undefined') {

                $.ajax({
                    type: "Get",
                    url: "/Eform/getClauseFieldValue/",
                    data: { id: id },
                    cache: false
                }).done(function (data) {
                    isAjaxRequestTimeOut(data);

                    if (data.status) {
                        $("#" + id).html(data.message);
                    }

                    initXeditableField(id, versionID, clauseID);

                }).fail(function (jqXHR, textStatus) {
                    alert("Request failed: " + textStatus);
                });
            }
        });

        $(this).show();
    });
}

function initEditables() {
    $.fn.editable.defaults.inputclass = 'form-control';
}

function resetClauseContent(id) {
    $.ajax({
        type: "Get",
        url: "/Eform/getClauseContent/",
        data: { id: id },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        $("#c_" + id).html(data);

    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function removeEformClause(versionID, clauseID) {
    $.ajax({
        type: "Post",
        url: "/Eform/removeEformClause/",
        data: { versionID: versionID, clauseID: clauseID },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        if (!data.status) {
            alert(data.message);
            loadClauses();
        }

    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function attachEformClause(versionID, clauseID) {
    $.ajax({
        type: "Post",
        url: "/Eform/attachEformClause/",
        data: { versionID: versionID, clauseID: clauseID },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        if (!data.status) {
            alert(data.message);
            loadClauses();
        }

    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function saveEformClauseOrder(versionID, order) {
    $.ajax({
        type: "Post",
        url: "/Eform/saveEformClauseOrder/",
        data: { versionID: versionID, order: order },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        if (!data.status) {
            alert(data.message);
            loadClauses();
        }

    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}
