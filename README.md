Project 3: Network Stickies
==================================

###Heroku URL

Please put it here: http://tranquil-inlet-4297.herokuapp.com/ 

###Notes

Safari 6.0.1 was used as the development browser.

Known issues:
- Clicking the "A" (font) button jumps the screen to the top of the page
  I had problem preventing the hash-jump because my clicks for the dropdown button somehow don't register properly in jQuery.
- Changes to the content of a note will not save if the div is still in focus when you refresh.
  This is an intentional decision. Make sure to click an area outside the note to commit the changes. Refresh to check that the changes persist.
- Changes to the content of a note may not save if you refresh too quickly.
  This may be due to poorly-written Javascript on my end, sorry! I tried to make sure the AJAX request for saving the note's changes are sent as quickly as possible.