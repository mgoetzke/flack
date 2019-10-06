class AddUniquenessConstraintChannel < ActiveRecord::Migration[5.2]
  def change
    add_index :channels, :name, unique: true
  end
end
