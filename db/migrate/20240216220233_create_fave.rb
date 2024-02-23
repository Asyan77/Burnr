class CreateFave < ActiveRecord::Migration[7.1]
  def change
    create_table :faves do |t|
      t.references :photo, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
    add_index :faves, [:photo_id, :user_id], unique: true
  end
end


