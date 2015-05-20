
// Action-Model Event Binders
$( document.body )
    // ================ FILTERS ==================
    .on( 'submit-stats', function( e, data, trigger )
    {
        if( e !== undefined ){ e.preventDefault(); }
        CJMEvents.submitStats();
    }
);
