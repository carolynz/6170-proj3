class AddTextsizeToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :textsize, :string, :default => "textsize-14"
  end
end
