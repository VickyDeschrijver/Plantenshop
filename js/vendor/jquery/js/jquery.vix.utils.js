// jquery.vix.utils.js

//jquery extensions door Vix.

(function($) {
    $.zegDankUTegen =   function(wie) {
        alert("Dank u wel " + wie + " !");
    }

    $.vandaag   =   function() {
        var vandaag =   new Date();
        return vandaag.toLocaleDateString();
    }

    $.fn.wordtGroen =   function() {
        return this.css('color', 'green');
    }

    //keuzelijst aanmaken
    $.fn.vulSelect  =   function(arrData, strFirstOption) {
        /* vult een SELECT met gegevens uit een array, een optioneel eerste item is mogelijk
        @ arrData           1-dim array TEKST of 2-dim array VALUE|TEKST
        @ strFirstOption    string, optioneel, de tekst voor een eerste default option, de value is steeds ''
         */

        return this.each(function() {
            if (this.tagName == 'SELECT') {
                var eSelect =   $(this);
                eSelect.leegSelect();
                if(strFirstOption != null) {
                    eSelect.append("<option value='' selectd='selected'>" + strFirstOption + "</option>");
                }
                // is het array 1 of 2 dimensionaal
                if(!$.isArray(arrData[0])) {
                    $.each(arrData, function(index, data) {
                        eSelect.append('<option value=' + arrData[index] + '>' + arrData[index] + '</option>');
                    });
                }
                else {
                    $.each(arrData, function(index, data) {
                        eSelect.append('<option value=' + arrData[index][0] + '>' + arrData[index][1] + '</option>');
                    });
                }
            }   // einde if
        })  // einde this.each
    }   // einde vulSelect

    // wrapper leegSelect
    $.fn.leegSelect =   function() {
        return this.each(function () {
            if (this.tagName == 'SELECT') {
                $(this).empty();
            }
        });
    }

}) (jQuery)