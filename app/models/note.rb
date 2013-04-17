class Note < ActiveRecord::Base
  attr_accessible :contents, :width, :height, :style, :align
  belongs_to :user
  validates_presence_of :contents, :on => :create

  def classes
    classes = ""
    classes << self.width << " " << self.height << " " << self.align << " " << self.style
    return classes
  end
end
