class ChangeBooleanColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :channels, :private?, :is_private
  end
end
