(function ($) {
    jQuery.fn.mentalImgStimulation = function () {

        var settings = arguments[0];
        var id = $(this).attr("id");
        var tmp = $.fn.mentalImgStimulation.tmp[id];

        var config = {
            photos: [
                { id: 0, img: 'resources/mentalImg/img/carretera.jpeg' },
                { id: 1, img: 'resources/mentalImg/img/ciudad.jpg' },
                { id: 2, img: 'resources/mentalImg/img/construccion.jpeg' },
                { id: 3, img: 'resources/mentalImg/img/fabrica.jpg' },
                { id: 4, img: 'resources/mentalImg/img/terreno.jpg' },
            ],
            objects:[
                { id: 0, img: 'resources/mentalImg/img/cereal.jpg' },
                { id: 1, img: 'resources/mentalImg/img/cocacola.jpg' },
                { id: 2, img: 'resources/mentalImg/img/galletas.jpg' },
                { id: 3, img: 'resources/mentalImg/img/pastillas.jpg' },
                { id: 4, img: 'resources/mentalImg/img/telefono.jpg' },
            ],

            currentData: {
                currentDate : new Date(),
                corrida : 0,
                seccion : "",
                secuencia : -1,
                elementoIntensificado : -1,
                epoca : -1,
                rep : -1,
                maxRep : -1,
            }
        };


        // Tiempos
        var preRunTime = 2000;
        var postRunTime = 0500;
        var preSeqTime = 2000;
        var postSeqTime = 2000; //
        var stimulationTime = 62.5; // Flash
        var isiTime = 125; // ISI
        var rep = 15; // Num de repeticiones
        var ite; // repeticion en la que se encuentra
        var stimulationArray; //Array a iterar
        var i;
        var callback; // Funcion que se manda a llamar cuando termine la estimulacion

        // Inicia las sequencias (Tiempo muerto)
        var preRun = () => {
            // Inicializamos iteracion
            ite = 0;

            tmp.currentData.currentDate = new Date();
            tmp.currentData.seccion = "prerun";

            // Iniciara en unos momentos la sequencia
            setTimeout(() => {
                preSeq();
            }, preRunTime);
        }

        // Presecuencia (Genero epoca)
        var preSeq = () => {
            if (ite < rep) {

                tmp.currentData.currentDate = new Date();
                tmp.currentData.seccion = "presequence";
                tmp.currentData.secuencia = ite;
                tmp.currentData.elementoIntensificado = -1;


                // Obtiene secuencias de flash
                stimulationArray = getRandom(tmp.elements.length);
                setTimeout(() => {
                    i = 0;
                    stimulation();
                }, preSeqTime);
            }
            else postRun();
        }

        // Inicia secuencia por cada elemento (Intensifica elemento)
        var stimulation = () => {
            if (i < stimulationArray.length) {
                var row = stimulationArray[i];

                tmp.currentData.currentDate = new Date();
                tmp.currentData.seccion = "intensifica";
                tmp.currentData.elementoIntensificado = row;

                $($(`#${id} .row`)[row]).addClass('selected');
                setTimeout(() => {
                    isi();
                }, stimulationTime);
            }
            else postSeq();
        }

        // Quita elemento intensificado
        var isi = () => {
            $("#" + id + " .selected").removeClass('selected');
            i++;

            tmp.currentData.currentDate = new Date();
            tmp.currentData.seccion = "isi";

            setTimeout(() => {
                stimulation();
            }, isiTime);
        }

        var postSeq = () => {

            tmp.currentData.currentDate = new Date();
            tmp.currentData.seccion = "postsequence";
            tmp.currentData.elementoIntensificado = -1;

            // Reinicia estimulacion
            setTimeout(() => {
                ite++;
                preSeq(); // Ejecuta preSeq
            }, postSeqTime);
        }

        var postRun = () => {

            tmp.currentData.currentDate = new Date();
            tmp.currentData.seccion = "postrun";


            setTimeout(() => {
                if (callback != undefined) callback();
            }, postRunTime);
        }

        var getRandom = (len) => {
            var array = [];
            for (let i = 0; i < len; i++) {
                var random;
                do {
                    random = Math.floor(Math.random() * len);
                } while (array.indexOf(random) >= 0);
                array.push(random);
            }
            return array;
        }

        // element-specific code here
        switch (settings) {
            case 'destroy':
                break;

            case 'disable':
                break;

            case 'getLengthMatrix':
                return tmp.elements.length;
                break;

            case 'start':
                callback = arguments[1];
                // Inicia preRun
                preRun();
                break;

            case 'stop':
                clearTimeout(tmp.timeOut);
                break;

            default:
                // Si ya esta creado retorna
                if ($("#" + id).hasClass('table')) return;
                $("#" + id).addClass('table');

                // Guardo datos temporalmente
                var opts = $.extend(true, {}, config, settings);

                //se muestran las imagenes
                opts.photos.forEach(item => {
                    console.log("ola k pasa");
                });

                // Guardando configuraciones
                $.fn.mentalImgStimulation.tmp[id] = opts;
                break;
        }
    };
    $.fn.mentalImgStimulation.tmp = new Array();
})(jQuery);