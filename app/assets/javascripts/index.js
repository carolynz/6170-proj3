$(document).ready(function(){

  var toolbar = $('.toolbar').remove();

  // Tooltip handling
  $('.note_delete_class').tooltip({
    title: 'Delete',
  });

  $('.note_edit_class').tooltip({
    title: 'Edit formatting',
  });

  // Popover handling
  $("#notes").on('click','.popover-toggle', function(e){
      // console.log($(this));
      $(this).popover('toggle');
    })
    .on('mouseleave','.popover', function(e){
      $(this).siblings('.popover-toggle').popover('hide');
    });

  // Width and height resize handling
  $("#notes")
    .on('click', '.wnum', function(e){
      // Change note's width upon selection
      e.preventDefault();
      // console.log('wnum clicked');
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var selectedWidth = $(this).attr('id').replace(/^\D+/g, '');
      var newWidthClass = 'notewidth'+selectedWidth;

      note.removeClassRegex(/^notewidth/).addClass(newWidthClass);

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
    .on('click', '.hnum', function(e){
      // Change note's width upon selection
      e.preventDefault();
      // console.log('hnum clicked');
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var selectedHeight = $(this).attr('id').replace(/^\D+/g, '');
      var newHeightClass = 'noteheight'+selectedHeight;

      note.removeClassRegex(/^noteheight/).addClass(newHeightClass);

      $('#notes').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });

      // Send width update request to server
      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: { id: noteId, height: newHeightClass} },
               success: function() {
                 // console.log('SERVER: height updated to '+selectedHeight);
               }
      });
    })

    // Text size handling
    var textsizes = [12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 108, 144];

    $("#notes").on('click', '.textsize', function(e){
      e.preventDefault();
      // console.log('a textsize button was clicked');
      // console.log($(this).attr('id'));
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var oldSize;
      // console.log(" " + note.attr('class') + " ");
      var matches = (" " + note.attr('class') + " ").match(/\stextsize-(\d+)\s/);
      // console.log('matches');
      // console.log(matches);
      if (matches) {
        oldSize = parseInt(matches[1], 10);
        // console.log('oldSize');
      }

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
                     // console.log('SERVER: textsize increased to '+newSize);
                   }
          });
        };     
      } else if($(this).attr('id') === 'textsize-decrease') {
        // if the old text size is not the smallest text size,
        // (e.g., if the text size can still be decreased),
        // update the classes in the DOM and send the AJAX update request
        if (oldSize > textsizes[0]) {
          var newSize = textsizes[(textsizes.indexOf(oldSize)-1)];
          var newTextsizeClass = 'textsize-'+newSize;
          note.removeClassRegex(/^textsize-/).addClass(newTextsizeClass);
          // Send width update request to server
          $.ajax({ url: '/notes/'+noteId,
                   type: 'PUT',
                   data: { note: { id: noteId, textsize: newTextsizeClass} },
                   success: function() {
                     // console.log('SERVER: textsize decremented to '+newSize);
                   }
          });
        }; 
      };      
    });

  // Prevent mousedowns from taking focus off of contenteditable
  $("#notes").on('mousedown', '.toolbar', function(e){
      e.preventDefault();
      // console.log('mousedown in toolbar');
    })
    .on('click','.style', function(e){
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
    })
    .on('click','.align', function(e){
      // console.log('align clicked');
      // console.log($(this));
      // console.log(e);
      // console.log('e.target: ');
      // console.log(e.target);
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
    })
    .on('click','.dropdown-toggle', function(e){
      e.preventDefault();
      return false;
    });

    // Handle note hover events
    $('#notes').on('mouseenter', '.note', function(){
      // console.log('mouseentered note');
      $(this).children(".note_delete_class").show();
      if (!($(this).children('.toolbar')[0])){
        $(this).children(".note_edit_class").show();
      }
    })
    .on('mouseleave', '.note', function(){
      $(this).children(".note_delete_class").hide();
      $(this).children(".note_edit_class").hide();
    });

    $('#notes').on('click', '.note_edit_class', function(){
      if ($('.toolbar')[0]){
        $('.toolbar').remove();
      }
      $(this).parent().append(toolbar);
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
      // console.log('note_contents blurred!');
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


  $('#notes').isotope({
    // options for jquery isotope plugin
    masonry: {
      columnWidth:210
    },
    itemSelector : '.note',
  });    

});

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