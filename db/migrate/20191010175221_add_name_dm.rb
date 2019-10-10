class AddNameDm < ActiveRecord::Migration[5.2]
  def change
    add_column :directs, :name, :string
  end
end
