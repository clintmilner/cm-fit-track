
var CJMEvents = ( function()
{
    var $html = $( 'html' );

    return {
        init: function()
        {
            var bodyWeight = [], $bodyWeightChartCont = document.getElementById( 'bodyWeightChart' ),
                boneWeight = [], $boneWeightChartCont = document.getElementById( 'boneWeightChart' ),
                waterPct = [], $waterPctChartCont = document.getElementById( 'waterPctChart' ),
                fatPct = [], $fatPctChartCont = document.getElementById( 'fatPctChart' ),
                date = [];

            $html.removeClass( 'no-js' ).addClass( 'js' );

            // go get the data
            cmFitTrack.on( 'value', function(snapshot) {
                console.log(snapshot.val());

                var stats = snapshot.val();

                for (var key in stats) {
                    if (stats.hasOwnProperty(key)) {
                        bodyWeight.push(stats[key].bodyWeight);
                        boneWeight.push(stats[key].boneWeight);
                        waterPct.push(stats[key].waterPct);
                        fatPct.push(stats[key].fatPct);
                        date.push(stats[key].date);
                    }
                }

                CJMEvents.drawChart( CJMEvents.returnData( bodyWeight, date, 'Body Weight' ), $bodyWeightChartCont );
                CJMEvents.drawChart( CJMEvents.returnData( boneWeight, date, 'Bone Weight' ), $boneWeightChartCont );
                CJMEvents.drawChart( CJMEvents.returnData( fatPct, date, 'Fat Percentage' ), $fatPctChartCont );
                CJMEvents.drawChart( CJMEvents.returnData( waterPct, date, 'Water Percentage' ), $waterPctChartCont );

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });


        },
        returnData: function( data, date, label )
        {
            return {
                labels : date,
                datasets : [
                    {
                        label: label,
                        fillColor : CJMEvents.randomRGBA(),
                        strokeColor : CJMEvents.randomRGBA(),
                        pointColor : CJMEvents.randomRGBA(),
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : CJMEvents.randomRGBA(),
                        data : data
                    }
                ]
            };

        },
        randomRGBA: function()
        {
            return 'rgba(' + CJMEvents.getRandom( 0, 255 ) + ',' + CJMEvents.getRandom( 0, 255 ) + ',' + CJMEvents.getRandom( 0, 255 ) + ',' +  CJMEvents.getRandom( .3, 1 ) + ')';

        },
        getRandom: function( min, max )
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        submitStats: function()
        {
            var stats={};

            stats.bodyWeight = $( '#bodyWeight' ).val();
            stats.fatPct = $( '#fatPct' ).val();
            stats.boneWeight = $( '#boneWeight' ).val();
            stats.waterPct = $( '#waterPct' ).val();
            stats.date = moment().format( 'MMMM Do YYYY' );

            if( $('#honeypot' ).val() === '' && stats.bodyWeight > 0 )
            {
                cmFitTrack.push( stats );
                location.reload();
            }
            else
            {
                $( 'nav' ).removeClass( 'navbar-inverse' )
                    .addClass( 'bg-danger' );

            }

        },
        getStats: function( snapshot )
        {
            var bodyWeight = [],
                boneWeight = [],
                waterPct = [],
                fatPct = [],
                date = [];

            cmFitTrack.on( 'value', function(snapshot) {
            var stats = snapshot.val();

                for (var key in stats) {
                    if (stats.hasOwnProperty(key)) {
                        bodyWeight.push(stats[key].bodyWeight);
                        boneWeight.push(stats[key].boneWeight);
                        waterPct.push(stats[key].waterPct);
                        fatPct.push(stats[key].fatPct);
                        date.push(stats[key].date);
                    }
                }

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            return {
                labels : date,
                datasets : [
                    {
                        label: "Body Weight",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : bodyWeight
                    },
                    {
                        label: "Bone Weight",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : boneWeight
                    },
                    {
                        label: "Fat Percentage",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : fatPct
                    },
                    {
                        label: "Water Percentage",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : waterPct
                    }
                ]

            };
        },
        drawChart: function( data, canvasId )
        {
            var ctx = canvasId.getContext("2d");
            window.myLine = new Chart(ctx).Line( data, {
                responsive: true
            });
        }
    };
})();