class Note < ActiveRecord::Base
  attr_accessible :contents, :pinned
  belongs_to :user
  validates_presence_of :contents, :on => :create

end
