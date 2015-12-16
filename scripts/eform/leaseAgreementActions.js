//===================================================

$(function () {
    loadLeasForm('tab_1_1_1');
    loadTerms('tab_1_1_2');
    loadClause('tab_1_1_3');

    //auto save the form in every 5 minutes
    setInterval(function () {
        autoSaveForm();
    }, 150000);
});

//===================================================

function printFormToPDF() {
    var versionID = $("#versionID").val();
    window.open("/LeaseAgreement/printLeaseAgreement/?versionID=" + versionID, '_blank');

   /*
    var data = $("#leaseAgreementForm").serializeArray();
    var eformID = $("#eformId").val();

    $.ajax({
        type: "Post",
        url: "/LeaseAgreement/saveLeaseForm/",
        data: data,
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        if (data.status) {
            window.location = "/LeaseAgreement/printLeaseAgreement/?formID=" + eformID;
        }
        else {
            alert(data.message);
        }


    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

    */

    
} 

//===================================================

function loadLeasForm(id) {
    var eformID = $("#eformId").val();
    var versionID = $("#versionID").val();

    $.ajax({
        type: "Get",
        url: "/LeaseAgreement/loadLeaseForm/",
        data: { formID: eformID, versionID: versionID },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        $("#" + id).html(data);

    }).fail(function (jqXHR, textStatus) {
        $("#" + id).html("Request failed: " + textStatus);
    });
}

//===================================================

function loadTerms(id) {
    $.ajax({
        type: "Get",
        url: "/LeaseAgreement/loadLeaseTerms",
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        $("#" + id).html(data);

    }).fail(function (jqXHR, textStatus) {
        $("#" + id).html("Request failed: " + textStatus);
    });
}

//Function For Attaching Spinner To Full Page Bootstrap Modal
function triggerSpinner() {

    //Object for spinner settings
    var optsb = {
        lines: 11 // The number of lines to draw
        , length: 40 // The length of each line
        , width: 13 // The line thickness
        , radius: 25 // The radius of the inner circle
        , scale: 0.5 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#d63837' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '42%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    }

    //Full Modal Spinner Get Dom Element and Create Spinner Object
    var targetB = document.getElementById('modal-loader');
    var spinnerb = new Spinner(optsb);
    var spinIt = spinnerb.spin(targetB);

    //Attach spinner to full screen modal
    $('#modal-loader').modal('show');
    $('#modal-loader').on('shown.bs.modal', function (e) {
        spinnerb;
        $('.modal-content').append(spinIt);
    })

    return spinnerb;
}

function killSpin(spinnerb) {
    var targetB = document.getElementById('modal-loader');
    spinnerb.stop(targetB);
    $('#modal-loader').modal('hide');
}


//===================================================


function saveForm() {

    //Trigger the spin after autosave initiates
    var spinnerb = triggerSpinner();
    var data = $("#leaseAgreementForm").serializeArray();

    $.ajax({
        type: "Post",
        url: "/LeaseAgreement/saveLeaseForm/",
        data: data,
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);
        killSpin(spinnerb);
        //alert(data.message);
        saveCompleteNotification(data.status);

        console.log(data.status + ' tester');
        console.log(data.message);

        if (data.status) {
            $("#versionID").val(data.data);
            loadLeasForm('tab_1_1_1');
        }

    }).fail(function (jqXHR, textStatus) {
        killSpin(spinnerb);
        //alert("Request failed: " + textStatus);
        saveCompleteNotification(textStatus);
        console.log(textStatus)
    });

}

//===================================================



function autoSaveForm() {

    //Trigger the spin after autosave initiates
    var spinnerb = triggerSpinner();

    //Bing's original Saving Code
    var data = $("#leaseAgreementForm").serializeArray();
    $.ajax({
        type: "Post",
        url: "/LeaseAgreement/autoSaveLeaseForm/",
        data: data,
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        killSpin(spinnerb);
        
        //alert(data.message);
        saveCompleteNotification()

        if (data.status) {
            
            $("#versionID").val(data.data);
            loadLeasForm('tab_1_1_1');
        }


    }).fail(function (jqXHR, textStatus) {
        killSpin(spinnerb);
        //alert("Request failed: " + textStatus);
    });


} //Autosave Ends

//===================================================

function loadFormVersion() {
    var eformID = $("#eformId").val();

    $("#versionContent").html('');

    $.ajax({
        type: "Get",
        url: "/LeaseAgreement/loadFormVersionSlider/",
        data: { id: eformID },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        $("#versionContent").html(data);


    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function restoreToVersion(versionID) {

    var eformID = $("#eformId").val();

    $.ajax({
        type: "POST",
        url: "/LeaseAgreement/restoreToVersion/",
        data: { eformID: eformID, versionID: versionID },
        cache: false
    }).done(function (data) {
        isAjaxRequestTimeOut(data);

        alert(data.message);

        if (data.status) {
            $("#versionID").val(data.data);
            loadLeasForm('tab_1_1_1');
        }


    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

//===================================================
