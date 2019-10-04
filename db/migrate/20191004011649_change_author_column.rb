class ChangeAuthorColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :author_id, :user_id
  end
end
