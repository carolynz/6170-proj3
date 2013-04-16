class User < ActiveRecord::Base
  attr_accessible :email, :password, :password_confirmation
  has_secure_password
  validates_uniqueness_of :email, :on => :create
  validates_presence_of :password, :on => :create

  has_many :notes, order: "created_at desc"
  has_many :hashtags, :through => :notes, order: "name asc"

  def unique_hashtags
    return self.hashtags.uniq
  end

end