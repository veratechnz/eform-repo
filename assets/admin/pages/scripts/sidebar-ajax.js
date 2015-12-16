function PopulateSlider(slidercontenttype) {
        GetSliderContent(slidercontenttype);
    }


    function GetSliderContent(slidercontenttype) {
        $.ajax({
            type: "get",
            url: "/eform/populateslidercontent",
            cache: false,
            data: "&slidercontenttype=" + slidercontenttype
        })
            .done(function (data) {
                $("#slider-contents").html(data);
            })
            .fail(function () {
                
            });
    }