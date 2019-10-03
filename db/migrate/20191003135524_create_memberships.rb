class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.integer :user_id, null: false
      t.integer :memberable_id, null: false
      t.string :memberable_type, null: false

      t.timestamps
    end

    add_index :memberships, [:user_id, :memberable_id]
  end
end
