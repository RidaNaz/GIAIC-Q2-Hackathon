"use strict";
// Import jQuery if you're using modules
// import $ from 'jquery';
$(document).ready(function () {
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV(); // Assuming `generateCV` is defined somewhere
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
