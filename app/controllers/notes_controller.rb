class NotesController < ApplicationController
  # GET /notes
  # GET /notes.json
  def index
    if current_user
      @notes = current_user.notes
      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @notes }
      end
    else
      redirect_to log_in_path
    end
  end

  # POST /notes
  # POST /notes.json
  def create
    @note = current_user.notes.create(params[:note])

    respond_to do |format|
      if @note.save
        format.js
      end
    end
  end

  # PUT /notes/1
  # PUT /notes/1.json
  def update
    @note = Note.find(params[:id])

    respond_to do |format|
      if @note.update_attributes(params[:note])
        format.json { head :no_content }
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
    end
  end
end
