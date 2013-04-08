class ApplicationController < ActionController::Base
  protect_from_forgery

  force_ssl

  # User-friendly error message if permission denied
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  private

  # Returns the user associated with the current session
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

end
