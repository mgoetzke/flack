class RemoveDirectName < ActiveRecord::Migration[5.2]
  def change
    remove_column :directs, :name
  end
end
