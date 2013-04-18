class AddMoreFeaturesToNote < ActiveRecord::Migration
  def change
    add_column :notes, :backgroundcolor, :string, :default => "#333333"
    add_column :notes, :textcolor, :string, :default => "#EEEEEE"
    add_column :notes, :italics, :string, :default => ""
  end
end
