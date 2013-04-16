class AddSizeToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :width, :string, :default => "notewidth1"
    add_column :notes, :height, :string, :default => "noteheight1"
  end
end
