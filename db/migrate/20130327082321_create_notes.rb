class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :user_id
      t.string :contents
      t.boolean :pinned
      
      t.timestamps
    end
  end
end
