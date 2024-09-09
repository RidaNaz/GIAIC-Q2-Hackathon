// Import jQuery if you're using modules
// import $ from 'jquery';

$(document).ready(function(){
    ($('.repeater') as any).repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function() {
            $(this).slideDown();
        },
        hide: function(deleteElement: () => void) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV(); // Assuming `generateCV` is defined somewhere
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});