$(document).ready(function(){
  // Remove toolbar from the view and save it as the "toolbar" variable as soon as the document has loaded.
  // Note for TA: Originally, I had a long string with the HTML for the toolbar in this file.
  // I changed my mind and made the toolbar hidden on the main notes page
  // for a slightly cleaner and easier-to-read implementation.
  var toolbar = $('.toolbar').remove();

  // Add tooltips to notes' delete icons
  $('.note_delete_class').tooltip({
    title: 'Delete',
  });

  // Add tooltips to notes' pencil (edit formatting) icons
  $('.note_edit_class').tooltip({
    title: 'Edit formatting',
  });

  // Toggle popover when .popover-toggle classes are clicked
  // Hide other popovers when a new popover is opened,
  // So that only one popover is ever open at a time.
  $("#notes").on('click','.popover-toggle', function(e){
      // console.log($(this));
      $(this).popover('toggle');
    })
    .on('mouseleave','.popover', function(e){
      $(this).siblings('.popover-toggle').popover('hide');
    });

  /**********************
  * NOTE WIDTH HANDLING *
  ***********************/

  // Handler for click events on the width and size popovers
  // Change note's width upon selection:
  $("#notes").on('click', '.wnum', function(e){
      e.preventDefault();
      // console.log('wnum clicked');
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var selectedWidth = $(this).attr('id').replace(/^\D+/g, '');
      var newWidthClass = 'notewidth'+selectedWidth;

      // Update the note's size in the view
      note.removeClassRegex(/^notewidth/).addClass(newWidthClass);
      // Reorganize the note tiles
      $('#notes').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });

      // Send width update request to server
      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: { id: noteId, width: newWidthClass} },
               success: function() {
                 // console.log('SERVER: width updated to '+selectedWidth);
               }
      });
    })
    // Change note's height upon selection:
    .on('click', '.hnum', function(e){
      e.preventDefault();
      // console.log('hnum clicked');
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var selectedHeight = $(this).attr('id').replace(/^\D+/g, '');
      var newHeightClass = 'noteheight'+selectedHeight;

      // Update the note's size in the view
      note.removeClassRegex(/^noteheight/).addClass(newHeightClass);
      // Reorganize the note tiles
      $('#notes').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });

      // Send height update request to server
      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: { id: noteId, height: newHeightClass} },
               success: function() {
                 // console.log('SERVER: height updated to '+selectedHeight);
               }
      });
    })

    /*********************
    * TEXT SIZE HANDLING *
    **********************/

    // Array of possible text sizes (in pt)
    var textsizes = [12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 108, 144];

    // Handler for the text-size buttons
    $("#notes").on('click', '.textsize', function(e){
      e.preventDefault();

      // Find the note's current text size by extracting the class
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var oldSize;
      // Match strings in the class that have the pattern " textsize-dd" where d is a digit
      var matches = (" " + note.attr('class') + " ").match(/\stextsize-(\d+)\s/);
      // If there are results, convert to int
      if (matches) {
        oldSize = parseInt(matches[1], 10);
      }

      // If the textsize-increase button was clicked
      if ($(this).attr('id') === 'textsize-increase') {
        // if the old text size is not the largest text size,
        // (e.g., if the text size can still be increased),
        // update the classes in the DOM and send the AJAX update request
        if (oldSize < textsizes[textsizes.length-1]) {
          var newSize = textsizes[(textsizes.indexOf(oldSize)+1)];
          var newTextsizeClass = 'textsize-'+newSize;
          note.removeClassRegex(/^textsize-/).addClass(newTextsizeClass);
          // Send width update request to server
          $.ajax({ url: '/notes/'+noteId,
                   type: 'PUT',
                   data: { note: { id: noteId, textsize: newTextsizeClass} },
                   success: function() {
                   }
          });
        };
       // If the textsize-decrease button was clicked
      } else if($(this).attr('id') === 'textsize-decrease') {
        // if the old text size is not the smallest text size,
        // (e.g., if the text size can still be decreased),
        // update the classes in the DOM and send the AJAX update request
        if (oldSize > textsizes[0]) {
          var newSize = textsizes[(textsizes.indexOf(oldSize)-1)];
          var newTextsizeClass = 'textsize-'+newSize;
          note.removeClassRegex(/^textsize-/).addClass(newTextsizeClass);
          $.ajax({ url: '/notes/'+noteId,
                   type: 'PUT',
                   data: { note: { id: noteId, textsize: newTextsizeClass} },
                   success: function() {
                   }
          });
        }; 
      };      
    });

 /**************************
  * TOOLBAR CLICK HANDLING *
  **************************/
  // Open toolbar when the pencil icon is clicked
  $('#notes').on('click', '.note_edit_class', function(){
      if ($('.toolbar')[0]){
        $('.toolbar').remove();
      }
      $(this).parent().append(toolbar);
    });
  $("#notes").on('mousedown', '.toolbar', function(e){
      // Prevent mousedowns from taking focus off of contenteditable
      e.preventDefault();
    });

  /***********************
  * FONT CHANGE HANDLING *
  ************************/  
  $("#notes").on('click','.style', function(e){
      e.stopPropagation();
      var newStyle = "style-"+$(this).attr('id');
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');

      note.removeClassRegex(/^style-/).addClass(newStyle);

      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: { id: noteId, style: newStyle } },
               success: function() {
                 // console.log('style updated');
               }
      });
    });

  /*********************
  * ALIGNMENT HANDLING *
  **********************/ 
  $("#notes").on('click','.align', function(e){
    e.stopPropagation();
    var newAlign = "align-"+$(this).attr('id');
    var note = $(this).closest('.note');
    var noteId = note.attr('id').replace(/^\D+/g, '');
    note.removeClassRegex(/^align-/).addClass(newAlign);
    $.ajax({ url: '/notes/'+noteId,
             type: 'PUT',
             data: { note: { id: noteId, align: newAlign } },
             success: function() {
               // console.log('alignment updated');
             }
    });
  });

  // Handle note hover events
  $('#notes').on('mouseenter', '.note', function(){
    $(this).children(".note_delete_class").show();
    if (!($(this).children('.toolbar')[0])){
      $(this).children(".note_edit_class").show();
    }
  })
  .on('mouseleave', '.note', function(){
    $(this).children(".note_delete_class").hide();
    $(this).children(".note_edit_class").hide();
  });

  // Handle note contents events
  $('#notes').on('focus', '.note_contents', function(){
    // If there are open toolbars elsewhere,
    // remove them from the DOM
    if ($('.toolbar')[0]){
      $('.toolbar').remove();
    }
  })
  .on('blur', '.note_contents', function(){
        var contents = $(this).contents;
        var newText = $(this).html();
        // console.log(newText);
        var noteId = $(this).closest('.note').attr('id').replace(/^\D+/g, '');
        $.ajax({ url: '/notes/'+noteId,
                 type: 'PUT',
                 data: { note: { id: noteId, contents: newText } },
                 success: function() {
                    // console.log('content update success!');
                 }
        });
  });

  // Isotope is a jQuery plugin used for the gridlike effect
  // For more information, see: isotope.metafizzy.co
  $('#notes').isotope({
    // options for jquery isotope plugin
    masonry: {
      columnWidth:210
    },
    itemSelector : '.note',
  });    
});

// Function to remove classes given a regex pattern
// Taken from this blog post: http://www.websanova.com/tutorials/jquery/jquery-remove-class-by-regular-expression
(function($){
  $.fn.removeClassRegex = function(regex){
    return this.each(function()
    {
        var classes = $(this).attr('class');

        if(!classes || !regex) return false;

        var classArray = [];
        classes = classes.split(' ');

        for(var i=0, len=classes.length; i<len; i++) if(!classes[i].match(regex)) classArray.push(classes[i]);

        $(this).attr('class', classArray.join(' '));
    });
  };
})(jQuery);