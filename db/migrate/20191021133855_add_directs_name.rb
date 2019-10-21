class AddDirectsName < ActiveRecord::Migration[5.2]
  def change
         add_column :directs, :name, :string, null: false
  end
end
