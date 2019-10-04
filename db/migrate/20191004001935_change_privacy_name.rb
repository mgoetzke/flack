class ChangePrivacyName < ActiveRecord::Migration[5.2]
  def change
    rename_column :channels, :is_private, :private
  end
end
