class Ability
  include CanCan::Ability
  def initialize(user)
    user ||= User.new # guest user (not logged in)

    # Users can view their own profile, change e-mail address or password, and delete their own account
    can [:read, :update, :destroy], User, :user_id => user.id
    
    # Anyone can create a new account
    can :create, User
    end
end