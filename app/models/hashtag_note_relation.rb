class HashtagNoteRelation < ActiveRecord::Base
  attr_accessible :hashtag, :note
  belongs_to :hashtag
  belongs_to :note
end
