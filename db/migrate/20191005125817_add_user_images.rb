class AddUserImages < ActiveRecord::Migration[5.2]
  def change
     add_column :users, :image_url, :string, null: false
  end
end
