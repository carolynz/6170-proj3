class NotesController < ApplicationController
  # # GET /notes
  # # GET /notes.json
  # def index
  #   if current_user
  #     @notes = current_user.notes
  #     @hashtags = current_user.unique_hashtags
  #     respond_to do |format|
  #       format.html # index.html.erb
  #       format.json { render json: @notes }
  #     end
  #   else
  #     redirect_to log_in_path
  #   end
  # end

  # POST /notes
  # POST /notes.json
  def create
    @note = current_user.notes.create(params[:note])
    @hashtags = current_user.unique_hashtags

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
    # TODO: this is not very secure
    @hashtags = current_user.unique_hashtags

    respond_to do |format|
      if @note.update_attributes(params[:note])
        format.js
        # TODO: include flash notice for error message
      end
    end
  end

  # DELETE /notes/1
  # DELETE /notes/1.json
  def destroy
    @note = Note.find(params[:id])
    @note.destroy

    @hashtags = current_user.unique_hashtags

    respond_to do |format|
      format.js
      # TODO: include flash notice for error message
    end
  end
end
