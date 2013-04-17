$(document).ready(function(){
  var toolbar = "<div class='toolbar btn-toolbar'> \
                  <div class='btn-group' data-toggle='buttons-radio'> \
                    <button class='btn toolbar-element'><i class='icon-align-left'></i></button> \
                    <button class='btn toolbar-element'><i class='icon-align-center'></i></button> \
                    <button class='btn toolbar-element'><i class='icon-align-right'></i></button> \
                  </div> \
                  <div class='btn-group'> \
                    <button class='btn toolbar-element popover-toggle' data-toggle='popover' \
                    data-placement='top' data-html='true' \
                    data-content='<a href=&quot;#&quot; class=&quot;wnum&quot; id=&quot;wnum_1&quot;>1</a> \
                    <a href=&quot;#&quot; class=&quot;wnum&quot; id=&quot;wnum_2&quot;>2</a> \
                    <a href=&quot;#&quot;class=&quot;wnum&quot; id=&quot;wnum_3&quot;>3</a>' \
                    title data-original-title='Width'> \
                    <i class='icon-th-large'></i> W</button> \
                  </div> \
                  <div class='btn-group'> \
                    <button class='btn toolbar-element popover-toggle' data-toggle='popover' \
                    data-placement='top' data-html='true' \
                    data-content='<a href=&quot;#&quot; class=&quot;hnum&quot; id=&quot;hnum_1&quot;>1</a>  \
                    <a href=&quot;#&quot; class=&quot;hnum&quot; id=&quot;hnum_2&quot;>2</a>  \
                    <a href=&quot;#&quot;class=&quot;hnum&quot; id=&quot;hnum_3&quot;>3</a>' \
                    title data-original-title='Height'> \
                    <i class='icon-th-large'></i> H</button> \
                  </div> \
                  <div class='btn-group'> \
                    <button class='btn toolbar-element dropdown-toggle' data-toggle='dropdown' href='#'> \
                      Style \
                      <span class='caret'></span> \
                    </button> \
                    <ul class='dropdown-menu'> \
                      <li><a href='#' class='style style-adelle-thin' id='adelle-thin'>Adelle Thin</a></li> \
                      <li><a href='#' class='style style-adelle-semibold' id='adelle-semibold'>Adelle Semibold</a></li> \
                      <li><a href='#' class='style style-jaf-facitweb-extra-light' id='jaf-facitweb-extra-light'>JAF Extra Light</a></li> \
                      <li><a href='#' class='style style-jaf-facitweb-extra-light-italic' id='jaf-facitweb-extra-light-italic'>JAF Extra Light Italic</a></li> \
                      <li><a href='#' class='style style-jaf-facitweb-regular' id='jaf-facitweb-regular'>JAF Regular</a></li> \
                      <li><a href='#' class='style style-jaf-facitweb-italic' id='jaf-facitweb-italic'>JAF Italic</a></li> \
                      <li><a href='#' class='style style-jaf-facitweb-extra-bold' id='jaf-facitweb-extra-bold'>JAF Extra Bold</a></li> \
                      <li><a href='#' class='style style-jaf-facitweb-extra-bold-italic' id='jaf-facitweb-extra-bold-italic'>JAF Extra Bold Italic</a></li> \
                      <li><a href='#' class='style style-league-gothic-regular' id='league-gothic-regular'>League Reguar</a></li> \
                      <li><a href='#' class='style style-league-gothic-italic' id='league-gothic-italic'>League Italic</a></li> \
                    </ul> \
                  </div> \
                </div>";

  $("#notes").on('mouseenter', '.note', function(){
      $(this).children(".note_delete").show();
    })
    .on('mouseleave', '.note', function(){
      $(this).children(".note_delete").hide();
    })
    .on('mousedown', '.toolbar', function(e){
      console.log('trying to prevent default....');
      e.preventDefault();
      console.log('idk...');
    })
    .on('click','.popover-toggle', function(e){
      console.log($(this));
      // e.stopPropagation();
      $(this).popover('show');
    })
    .on('mouseleave','.popover', function(e){
      $(this).siblings('.popover-toggle').popover('hide');
    })
    .on('focus', '.note_contents', function(){
      console.log('note_contents focused')
      $(this).parent().append(toolbar);
    })
    .on('blur', '.note_contents', function(){
      // send update note content via AJAX request to server 
      var newText = $(this).html();
      console.log(newText)
      var noteId = $(this).closest('.note').attr('id').replace(/^\D+/g, '');
      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: { id: noteId, contents: newText} },
               success: function() {
                 console.log('update successful!');
               }
      });
      // remove toolbar when the note is no longer in focus
      // $(this).siblings('.toolbar').remove();
    })
    .on('click','.style', function(e){
      var newStyle = "style-"+$(this).attr('id');
      var note = $(this).closest('.note');
      note.removeClassRegex(/^style-/).addClass(newStyle);
    })
    .on('click', '.wnum', function(e){
      // Change note's width upon selection
      e.preventDefault();
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var selectedWidth = $(this).attr('id').replace(/^\D+/g, '');
      var newWidthClass = 'notewidth'+selectedWidth;

      note.removeClassRegex(/^notewidth/).addClass(newWidthClass);

      $('#notes').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });

      // Send width update request to server
      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: {id: noteId, width: newWidthClass} },
               success: function() {
                 console.log('SERVER: width updated to '+selectedWidth);
               }
      });
    })
    .on('click', '.hnum', function(e){
      // Change note's width upon selection
      e.preventDefault();
      var note = $(this).closest('.note');
      var noteId = note.attr('id').replace(/^\D+/g, '');
      var selectedHeight = $(this).attr('id').replace(/^\D+/g, '');
      var newHeightClass = 'noteheight'+selectedHeight;

      note.removeClassRegex(/^noteheight/).addClass(newHeightClass);

      $('#notes').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });

      // Send width update request to server
      $.ajax({ url: '/notes/'+noteId,
               type: 'PUT',
               data: { note: {id: noteId, height: newHeightClass} },
               success: function() {
                 console.log('SERVER: height updated to '+selectedHeight);
               }
      });
    });
  // $('#all_notes_link').on('click', function(){
  //   console.log('all notes link got clicked, beginning');
  //   $('#notes_h1').text("All notes");
  //   $('#notes').html("<%= escape_javascript(render(:partial => 'notes/note', :collection => @notes))%>");
  //   console.log('all notes link got clicked, end');
  // });

  // $('.hashtag_link').on('click', function(){
  //   console.log('in hashtag_link function');
  //   var hashtag_id = $(this).closest('.hashtag').attr('id').replace(/^\D+/g, '');
  //   $.ajax({ url: '/hashtags/'+hashtag_id,
  //            type: 'GET',
  //            success: function(){
  //              console.log('got hashtag!');
  //            }
  //   });
  // });

  $('#notes').isotope({
    // options for jquery isotope plugin
    masonry: {
      columnWidth:210
    },
    itemSelector : '.note'    
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