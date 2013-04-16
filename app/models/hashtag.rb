class Hashtag < ActiveRecord::Base
  attr_accessible :name, :note
  has_many :hashtag_note_relations
  has_many :notes, :through => :hashtag_note_relations, order: "created_at desc"
end
