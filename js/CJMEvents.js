
var CJMEvents = ( function()
{
    var $html = $( 'html' );

    return {
        init: function()
        { 
            $html.removeClass( 'no-js' ).addClass( 'js' );
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
            }

            CJMEvents.drawGraphs();

            return false;

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
        drawGraphs: function()
        {
            var ctx = document.getElementById("overview").getContext("2d");
            window.myLine = new Chart(ctx).Line( CJMEvents.getStats(), {
                responsive: true
            });
        }
    };
})();