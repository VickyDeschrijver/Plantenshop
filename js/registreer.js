// Javascript voor registreer form

$(function(){

    //if(jQuery().validate) {console.log("validatie geladen");}
    //else {console.log("Validatie NIET geladen");}

    //$("#regForm").submit(function(e) {e.preventDefault()})    // fout opsporing in syntax

    // strong wachtwoord opbouwen
    $.validator.addMethod("wwCheck", function(value, element) {
        return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
    });

    $('#promos').click(function(){
        if ($(this).is(':checked')) {
            $('#email').removeAttr('disabled')[0].focus();
        }
        else {
            $('#email').attr('disabled', true).val("");
        }
    })

    var $foutBoksen =   $('div.foutBox');

    $('#regForm').validate({
        debug:          true,
        rules:          {
            vnaam:      "required",
            fnaam:      "required",
            postnr:     {
                required:   true,
                digits:     true,
                minlength:  4,
                maxlength:  4
            },
            geboren:    {
                required:   true,
                dateISO:    true
            },
            sexe:       "required",
            "ruimte[]": "required",
            "soort_id[]": {
                required:       true,
                rangelength:    [1,4]
            },
            username:   {
                required:   true,
                minlength:  8
            },
            ww1:        {
                wwCheck:    true
            },
            ww2:        {
                equalTo:    "#ww1"
            },
            email:      {
                required:   "#promos:checked",
                email:      true
            }
        },

        messages:       {
            vnaam:      "Voornaam is verplicht",
            postnr:     {
                required:   "Het postnummer is verplicht",
                digits:     "Een postcode bestaat enkel uit getallen",
                minlength:  "Een postcodenummer bestaat uit exact 4 getallen",
                maxlength:  "Een postcodenummer bestaat uit exact 4 getallen",
            },
            geboren:    {
                required:   "Geef uw geboortedatum in aub",
                dateISO:    "de datum moet het formaat YYYY-MM-DD hebben"
            },
            sexe:       "Kies uw geslacht",
            "ruimte[]": "Kies minstens &eacute;&eacute;n optie",
            "soort_id[]":   "Kies minstens &eacute;&eacute;n soort maar niet meer dan 4",
            username:   "Uw gebruikersnaam is verplicht en moet minimum 8 karakters hebben",
            ww1:        "Het wachtwoord moet min 8 karakters lang zijn en moet minstens &eacute;&eacute;n kleine letter, &eacute;&eacute;n hoofdletter; &eacute;&eacute;n getal en &eacute;&eacute;n speciaal karakter bevatten",
            ww2:        "Wachtwoord niet identiek",
            email:      {
                required:   "Een emailadres is nodig om u te kunnen contacteren",
                email:      "het emailadres is ongeldig"
            }

        },
        /* errorPlacement: function(error, element) {
            var $ctrlbx =   element.parents("div.controlbox");
            if($ctrlbx.length != 0) {
                error.insertAfter($ctrlbx);
            }
            else {
                error.insertAfter(element);
            }
        }, */
        errorContainer: $foutBoksen,
        errorLabelContainer:    $("ul", $foutBoksen),
        wrapper:        "li",
        submitHandler:  function(form) {
            form.submit();
        }
    });     // einde valideer

    $.datepicker.setDefaults($.datepicker.regional['nl-BE']);

    $("#geboren").datepicker({
        dateFormat:     "yy-mm-dd",
        yearRange:      '-80:+00',
        changeMonth:    true,
        changeYear:     true
    });

    // alle dialoogvensters: instellingen
    $(".dialoogvenster").dialog({
        autoOpen:   false,
        buttons:    {
            "ok":   function() {$(this).dialog("close");}
        },
        modal:      true,
        width:      600
    });

    // de dialoog Button
    $('#dialog_link_username')
        .button({icons:{secondary: "ui-icon-help"}})
        .click(function(e) {
            console.log('knop hier')
            e.preventDefault();
            $('#dialog_username').dialog('open');
        });

});     // einde doc ready

