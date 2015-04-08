
$(function () {
    var $advZoeken          =   $('#adv_zoeken');
    var $advZoekenLink      =   $('#adv_zoeken_link');

    //$advZoeken.hide();

    // lees localStorage
    var zoek                =   localStorage.getItem("advZoeken");
    var setting             =   (zoek != 0 && zoek != 1)?0:zoek;
    // onmiddellijk toepassen
    toggleZoeken(setting,$advZoekenLink,$advZoeken);

    $advZoekenLink.click(function(e) {
        e.preventDefault();
        setting =   1 - setting;    // bitwise Xor
        toggleZoeken(setting,$(this),$advZoeken);
        localStorage.setItem("advZoeken",setting);
    })
	
	// slider
    $("#slider-range-hoogte").slider({
        range:  true,
        values: [100, 500],
        min:    0,
        max:    5000,
        step:   10,
        slide:  function(event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
            herlaadTabel();
        },
        stop:   function(event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
            herlaadTabel();
        }
    });

    // initialiseren van de startwaarden
    $("#hoogte_min").val($("#slider-range-hoogte").slider("values", 0));
    $("#hoogte_max").val($("#slider-range-hoogte").slider("values", 1));

    // toevoegen van een title text aan de slideknoppen
    $(".ui-slider-handle", "#slider-range-hoogte")
        .first().attr({'title':'Minimum hoogte'})
        .end()
        .last().attr({'title':'Maximum hoogte'})

    //----- event handlers----------------//
    $("#kleur, #soort_id").change(function() {
        herlaadTabel();
    })

    function herlaadTabel() {
        // ajaxcall vr nieuwe gegevens vanuit sAjaxSource
        var qs      =   $('form').serialize()
        var qsa     =   $('form').serializeArray()
        console.log(qs);
        console.log(qsa);
        oTable.fnReloadAjax();
    }

    // dataTables
    var oTable  =   $("#plantenlijst").dataTable({
        "sAjaxSource":      "services/ajax_json_dt_planten.php",
        "fnServerData":     function(sSource, aoData, fnCallback) {
            $.getJSON (
                sSource,
                $('form').serializeArray(),
                function (json) {fnCallback(json)});
        },
        "bPaginate":        true,
        "bSort":            true,
        "iDisplayLength":   20,
        //"iDisplayStart":    20,
        "sPaginationType":  "full_numbers",
        "aLengthMenu":      [[10, 25, 50, -1], [10, 25, 50, "Alle Records"]],
        "bProcessing":      true,
        "aaSorting":        [[7, 'asc'], [3, 'desc']],
        "aoColumnDefs":     [
            { "bVisible":   false, "aTargets": [0, 6] },                            // eerste kolom 'id' && laatste kolom 'prijs' w verborgen
            { "bSortable":  false, "aTargets": [3, 7] },                            // 3e en 6e kolom kunnen nt meer worden gesorteerd
            { "asSorting":  false, "aTargets": [4] },                               // 4e kolom kan enkel 'asc' w gesorteerd
            { "bSearchable": false, "sTitle":   "Rubriek", "aTargets": [7] },       // Bepaald in welke kolom de zoekfunctie zoekt
            { "sTitle":     "Lengte", "sWidth": "5%", "aTargets": [3] },            // verandert kolom hoogte in 'lengte'
            { "sClass":     "dt_fluo", "aTargets": [1] }                            // geeft een class aan 1e kolom
        ],
        "oLanguage":        {"sUrl": "js/vendor/jquery/dataTables-1.10.6/media/js/datatables.nederlands.txt"},

    });



}); // einde doc.ready


function toggleZoeken (toon, $lienk, $el) {
    /*
    @toon           1|0 setting tonen of verbergen
    @$lienk         de hyperlink
    @$el            het element dat getoggeld moet worden
     */

    // eerste versie
    //$el.toggle('slow', function() {
    //    tekst   =   ($el.css('display')=="none")?"geavanceerd zoeken":"eenvoudig zoeken";
    //    $lienk.text(tekst);
    //})

    var txt_een     =   "eenvoudig zoeken";
    var txt_adv     =   "geavanceerd zoeken";

    if(toon == 1) {
        $el.show('slow');
        $lienk.text(txt_een);
    }
    else if (toon == 0) {
        $el.hide('fast');
        $lienk.text(txt_adv);
    }
    else {throw new Error ("arg toon verkeerd")}
}

