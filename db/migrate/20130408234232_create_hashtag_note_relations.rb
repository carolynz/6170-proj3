class CreateHashtagNoteRelations < ActiveRecord::Migration
  def change
    create_table :hashtag_note_relations do |t|
      t.string :hashtag_id
      t.string :note_id
      
      t.timestamps
    end
  end
end
