class NotesController < ApplicationController
  # POST /notes
  # POST /notes.json
  def create
    @note = current_user.notes.create(params[:note])

    respond_to do |format|
      if @note.save
        format.js
        # TODO: include flash notice for error message
      end
    end
  end

  # PUT /notes/1
  # PUT /notes/1.json
  def update
    @note = Note.find(params[:id])

    respond_to do |format|
      if @note.update_attributes(params[:note])
        # format.js
      else
        # TODO: include flash notice for error message
      end
    end
  end

  # DELETE /notes/1
  # DELETE /notes/1.json
  def destroy
    @note = Note.find(params[:id])
    @note.destroy

    respond_to do |format|
      format.js
      # TODO: include flash notice for error message
    end
  end
end
