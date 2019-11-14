class ChangeUserTableOnline < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :online
    add_column :users, :online, :boolean, default: false
  end
end
