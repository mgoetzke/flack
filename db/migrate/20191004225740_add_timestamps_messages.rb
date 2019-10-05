class AddTimestampsMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :created_at, :datetime, null: false
    add_column :messages, :updated_at, :datetime, null: false
  end
end
