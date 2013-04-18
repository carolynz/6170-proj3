class Note < ActiveRecord::Base
  attr_accessible :contents, :width, :height, :style, :align, :textsize, :backgroundcolor, :textcolor, :italics
  belongs_to :user
  validates_presence_of :contents, :on => :create

  # Returns a string of the classes for the note's div
  # Used for note styling purposes
  def classes
    classes = ""
    classes << self.width << " " << self.height << " " << self.align << " " << self.style << " " << self.textsize
    if (self.italics).length > 0
      classes << " " << self.italics
    end
    return classes
  end

end
