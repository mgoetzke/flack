class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null:false
      t.string :topic
      t.boolean :private?, null: false
      t.integer :admin_id, null: false
      t.timestamps
    end
  end
end
