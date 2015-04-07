// Javascript voor homepagina

$(function() {

    var ikoontjes   =   {
        header:         "ui-icon-circle-arrow-e",
        activeHeader:   "ui-icon-circle-arrow-s"
    }

    $('#keuzes').accordion({
        active:         1,
        icons:          ikoontjes,
        heightStyle:    "content",
        collapsible:    true,
        animate:        "easeOutSine"
    });


});     // einde doc ready
