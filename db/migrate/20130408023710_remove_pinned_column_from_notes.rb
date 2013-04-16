class RemovePinnedColumnFromNotes < ActiveRecord::Migration
  def up
    remove_column :notes, :pinned
  end

  def down
    add_column :notes, :pinned, :boolean, :default => false
  end
end
