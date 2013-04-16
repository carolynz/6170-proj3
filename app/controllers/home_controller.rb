class HomeController < ApplicationController
  def index
    if current_user
      @notes = current_user.notes
      @hashtags = current_user.unique_hashtags
      respond_to do |format|
        format.html # index.html.erb
        # format.json { render json: @notes }
      end
    else
      redirect_to log_in_path
    end
  end
end
