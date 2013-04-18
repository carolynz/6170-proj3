class NotesController < ApplicationController
  
  # Creates a new note object.
  # Upon successful note creation, calls 'create.js.erb,'
  # which adds the new note to the view.
  def create
    @note = current_user.notes.create(params[:note])

    respond_to do |format|
      if @note.save
        format.js
      end
    end
  end

  # Updates an existing note object.
  # Upon successful note creation, calls 'update.js.erb'
  def update
    @note = Note.find(params[:id])

    respond_to do |format|
      if @note.update_attributes(params[:note])
        format.js
      end
    end
  end

  # Deletes a note object from the database.
  # Upon successful note deletion, calls 'destroy.js.erb,'
  # which removes the deleted note from the view.
  def destroy
    @note = Note.find(params[:id])
    @note.destroy

    respond_to do |format|
      format.js
    end
  end
end
