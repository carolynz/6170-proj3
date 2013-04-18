class Note < ActiveRecord::Base
  attr_accessible :contents, :width, :height, :style, :align, :textsize
  belongs_to :user
  validates_presence_of :contents, :on => :create

  # Returns a string of the classes for the note's div
  # Used for note styling purposes
  def classes
    classes = ""
    logger.info "#{self.width}"
    logger.info "#{self.height}"
    logger.info "#{self.align}"
    logger.info "#{self.style}"
    logger.info "#{self.textsize}"
    classes << self.width << " " << self.height << " " << self.align << " " << self.style << " " << self.textsize
    return classes
  end

end
