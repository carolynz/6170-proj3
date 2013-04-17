class Note < ActiveRecord::Base
  attr_accessible :contents, :hashtags, :width, :height
  belongs_to :user
  has_many :hashtag_note_relations
  has_many :hashtags, :through => :hashtag_note_relations

  validates_presence_of :contents, :on => :create
  before_save :check_hashtags

  def check_hashtags
    self.contents.squeeze(' ').gsub(/[\n\t]/,'')
    # extract hashtags in the new note
    hashtag_strings = ((self.contents).scan(/(?:(?<=\s)|^)#(\w*[A-Za-z_]+\w*)/)).flatten
    hashtags = []

    hashtag_strings.each do |hs|
      hashtags << Hashtag.find_or_create_by_name(hs)
    end

    # if an old hashtag in the note is no longer associated with any notes, delete the hashtag object
    diff = self.hashtags - hashtags
    diff.each do |hashtag|
      if hashtag.notes.empty?
        hashtag.destroy
      end
    end

    # set note's hashtag associations to the intersection of the new and old hashtags
    self.hashtags = hashtags
  end

  def clear_hashtags
    hashtags_to_check = self.hashtags
    hashtag_note_relations.clear
    hashtags_to_check do |hashtag|

    end
  end

  def linkified_contents

  end

  def classes
    classes = ""
    classes << self.width << " " << self.height
    return classes
  end

  # TODO: check that, when a hashtag is deleted from a note, the associations are updated
    # if a hashtag has been removed from a note, but the hashtag is associated with other notes, then it will not be deleted
    # if a hashtag has 0 note associations, it is deleted from the database

  # TODO: linkify hashtags in notes

  # TODO: re-extract/update hashtags on update

end
