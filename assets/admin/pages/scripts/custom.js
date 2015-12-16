//Custom JS For Front End Prototyping
var localVars = {

}

//Setup Tooltips / Only turned on for desktop  -- Not Touch or mobile devices. 
if (!('ontouchstart' in window)) {
    $('[data-toggle="tooltip"]').tooltip({ container: 'body' }); // <-- Example code from Bootstrap docs
}



    // Complete Button Change Background Color To Red For Complete. Prototype Effect
    var completeButtonSwitch = function () {
        $('.complete, #completed').click(function () {
            ($(this).is('.complete')) ?
            $(this).hide('fast', function () {
                $('.completed').show();
            }) :
            $(this).hide('fast', function () {
                $('.complete').show();
            });
        });
    }(); //End of completeButtonSwitch



    //Modal Triggers
    var modalViewClauses = function () {

        $('.slide-icon-reinz').click(function (e) {
            $('#modal-view-clause-reinz').modal('show');
        });

        $('.slide-icon-company').click(function (e) {
            $('#modal-view-clause-company').modal('show');
        });

        $('.slide-icon-indi').click(function (e) {
            $('#modal-view-clause-indi').modal('show');
        });

        $('.slide-icon-indi-sv, .slide-icon-indi-sv-top').click(function (e) {
            $('#modal-view-clause-indi-new').modal('show');
        });

        $('.slide-icon-add-trans').click(function (e) {
            $('#modal-add-trans').modal('show');
        });

        $('.slide-icon-add-contact').click(function (e) {
            $('#modal-add-contact').modal('show');
        });

        $('.form-name-modal-trigger').click(function (e) {
            e.preventDefault();
            $('#myModal').modal('show');
        });

        //Cancel and Remove Modal. 
        $('#cancel-save').click(function (e) {
            console.log('save clicked');
            $('#modal-add-contact').modal('hide');
        });
    }();


    //Toggle click for front end display
    var panelFrontEndDisplay = function () {

        //Toggle component
        jQuery.fn.clickToggle = function (a, b) {
            var ab = [b, a];
            function cb() { ab[this._tog ^= 1].call(this); }
            return this.on("click", cb);
        };

        $('#clauses-button').clickToggle(function () {
            $('#clauses-panel').show();
        }, function () {
            $('#clauses-panel').hide();            
        });

        $('#admin-button').clickToggle(function(){           
            $('#admin-panel').show();
        }, function(){
            $('#admin-panel').hide();        
        });

        $('#contacts-button').clickToggle(function () {
            $('#contacts-panel').show();
        }, function(){
            $('#contacts-panel').hide();       
        });

    }();


    //Strikes out 13.2.a option on agreement to lease form
    var formsCheckForFocus = function () {;

        $('#atl-option-two').click(function () {
            $('#nine-month').css({'text-decoration' : 'line-through', 'color' : 'grey'});                  
        });

    }();


    //Creates sticky div for panel buttons at top of screen 
    var stickyDivFunciton = function () {

            // Check the initial Poistion of the Sticky Header
            $(window).scroll(function () {
                if ($(window).scrollTop() > 50) {
                    $('#assist-buttons').css({ 
                        position: 'fixed', 
                        top: '74px', 
                        right: '30px'
                    });
                    $('#clauses-button, #admin-button, #contacts-button, #complete').css(
                        'box-shadow', '-1px 1px 4px 0px rgba(130,126,130,1)');

                } else {
                    $('#assist-buttons').css({
                        position: 'static'
                    });
                    $('#clauses-button, #admin-button, #contacts-button, #complete').css('box-shadow', 'none');
                }

            });
    
    }();

    //Back to top button js
    var backToTopButton = function () {

        var offset = 400, // At what pixels show Back to Top Button
        scrollDuration = 300; // Duration of scrolling to top
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.top').fadeIn(500); // Time(in Milliseconds) of appearing of the Button when scrolling down.
            } else {
                $('.top').fadeOut(500); // Time(in Milliseconds) of disappearing of Button when scrolling up.
            }
        });

        // Smooth animation when scrolling
        $('.top').click(function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, scrollDuration);
        })

    }();

    //Function For Form Name Submission. POC Only so link continues after Create is clicked. 
    var submitFormName = function() {
        $('#submitFormName').click(function () { 
            window.location = $('.form-name-modal-trigger').attr('href');
        });
    }();

    //Function for Bing to provide prototype Autosave prompt message. 
    //  var savingTooltip = function() {
    //     var getSaver = document.getElementById('save-button');
    //        getSaver.setAttribute('data-original-title','Save Complete');    
    //        $('#save-button').tooltip('show');
        //SetTimeout for display and hide of bootstrap tooltip
    //        setTimeout(function() {
    //            getSaver.setAttribute('data-original-title', 'Save');
    //            $('#save-button').tooltip('hide');
    //        }, 6000);       
    //}();



//Save Div Injection To Notify User Of 
    function saveCompleteNotification(serverData) {

        //closeIt Closes save notification after reveal
        function closeIt() {
            setTimeout(function () {
                $('.save-fail-div, .save-complete-div').hide(800);
            }, 1300);
        }

        //Test server boolean from leaseAgreementActions.js
        if (serverData === true) {

            $('.save-complete-div').show(1000, function () {
                closeIt();
            });
            
        } else if (serverData == false || undefined || 'error' ) {
            $('.save-fail-div').show(1000, function () {
                var upper = serverData.toUpperCase();
                $('#saveErrorSpan').text(upper);
                closeIt();
            });
            
        }

    }









    

