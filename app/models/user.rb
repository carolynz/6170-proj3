class User < ActiveRecord::Base
  attr_accessible :email, :password_digest
end
