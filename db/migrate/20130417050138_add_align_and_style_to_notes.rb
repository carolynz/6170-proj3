class AddAlignAndStyleToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :align, :string, :default => "align-left"
    add_column :notes, :style, :string, :default => "style-jaf-facitweb-regular"
  end
end
