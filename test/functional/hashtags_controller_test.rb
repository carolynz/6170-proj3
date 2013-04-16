require 'test_helper'

class HashtagsControllerTest < ActionController::TestCase
  setup do
    @hashtag = hashtags(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hashtags)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hashtag" do
    assert_difference('Hashtag.count') do
      post :create, hashtag: { name: @hashtag.name }
    end

    assert_redirected_to hashtag_path(assigns(:hashtag))
  end

  test "should show hashtag" do
    get :show, id: @hashtag
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hashtag
    assert_response :success
  end

  test "should update hashtag" do
    put :update, id: @hashtag, hashtag: { name: @hashtag.name }
    assert_redirected_to hashtag_path(assigns(:hashtag))
  end

  test "should destroy hashtag" do
    assert_difference('Hashtag.count', -1) do
      delete :destroy, id: @hashtag
    end

    assert_redirected_to hashtags_path
  end
end
