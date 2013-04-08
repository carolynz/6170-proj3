require 'test_helper'

class UserFlowsTest < ActionDispatch::IntegrationTest
  fixtures :users

  test "login and logout" do
    https!
    get "/log_in"
    assert_response :success

    post_via_redirect "/log_in", :email => users(:one).email, :password_digest => users(:one).password_digest
    assert_not_nil session[:user_id]
    assert_equal '/notes', path

    get "/logout"
    assert_nil session[:user_id]
  end
end