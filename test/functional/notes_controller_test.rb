require 'test_helper'

class NotesControllerTest < ActionController::TestCase
  setup do
    @note = notes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:notes)
  end

  test "create should return 406 when note is blank" do
    post :create, note: { contents: '', user_id: @note.user_id }
    assert_response 406
  end

  test "create should return 406 when user ID is blank" do
    post :create, note: { contents: @note.contents, user_id: '' }
    assert_response 406
  end

  test "should create note when all params are filled" do
    assert_difference('Note.count') do
      post :create, note: { contents: @note.contents, user_id: @note.user_id }
    end
  end

  test "should destroy note" do
    assert_difference('Note.count', -1) do
      delete :destroy, id: @note
    end
  end

end
